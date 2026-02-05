// 1. CONFIGURATION TAILWIND (Thème)
tailwind.config = {
    theme: {
        extend: {
            colors: {
                darkBlue: '#242a44',
                tealCustom: '#1e9090',
                lightGray: '#e3eceb',
                indigoCustom: '#4849e3',
                pinkCustom: '#e27be7',
                mintCustom: '#3eccb8',
                blueSky: '#78c0cf',
            }
        }
    }
};

// 2. FONCTIONS UTILITAIRES
const generateEventId = () => 'wa_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// 3. GESTION DU SCROLL (Navbar)
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 20) {
        navbar.classList.add('bg-darkBlue/90', 'backdrop-blur-md', 'py-2', 'shadow-2xl');
        navbar.classList.remove('py-3');
    } else {
        navbar.classList.remove('bg-darkBlue/90', 'backdrop-blur-md', 'py-2', 'shadow-2xl');
        navbar.classList.add('py-3');
    }
});

// 4. MENU MOBILE & FAQ
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    if (menu && icon) {
        menu.classList.toggle('hidden');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }
}

function toggleFAQ(id) {
    const answer = document.getElementById('ans-' + id);
    const icon = document.getElementById('icon-' + id);
    if (answer && icon) {
        if (answer.classList.contains('hidden')) {
            answer.classList.remove('hidden');
            icon.style.transform = 'rotate(45deg)';
        } else {
            answer.classList.add('hidden');
            icon.style.transform = 'rotate(0deg)';
        }
    }
}

// 5. SCROLL FLUIDE ET TRACKING WHATSAPP
document.addEventListener('DOMContentLoaded', () => {
    
    // Scroll Fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMenu();
                }
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
            }
        });
    });

    // --- TRACKING WHATSAPP + OUVERTURE NOUVEL ONGLET ---
    document.querySelectorAll('.btn-whatsapp').forEach(button => {
        button.addEventListener('click', function(e) {
            // On bloque l'ouverture immédiate par défaut
            e.preventDefault(); 
            
            const eventId = generateEventId();
            const urlDestination = this.getAttribute('href'); 
            
            console.log('✅ Clic détecté ! ID:', eventId);

            // A. ENVOI NAVIGATEUR (Pixel Meta)
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {}, { eventID: eventId });
                console.log('📡 Pixel : Signal envoyé');
            }

            // B. ENVOI SERVEUR (Render)
            fetch('https://meta-capi-bridge.onrender.com/track-whatsapp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_id: eventId,
                    url: window.location.href,
                    fbp: getCookie('_fbp'),
                    fbc: getCookie('_fbc'),
                    test_code: 'TEST15470' 
                })
            })
            .then(() => console.log('📡 CAPI : Signal serveur envoyé'))
            .catch(err => console.error('❌ CAPI : Erreur', err));

            // C. OUVERTURE WHATSAPP DANS UN NOUVEL ONGLET
            // On attend 200ms pour laisser les scripts démarrer l'envoi
            setTimeout(() => {
                window.open(urlDestination, '_blank');
            }, 200);
        });
    });
});