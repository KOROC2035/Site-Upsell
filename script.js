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
        }

        
// Changement de style de la navbar au scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-darkBlue/90', 'backdrop-blur-md', 'py-3', 'shadow-lg');
        navbar.classList.remove('py-4');
    } else {
        navbar.classList.remove('bg-darkBlue/90', 'backdrop-blur-md', 'py-3', 'shadow-lg');
        navbar.classList.add('py-4');
    }
});

// Menu mobile Toggle
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    menu.classList.toggle('hidden');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
}

// Gestion du scroll fluide pour tous les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // On ferme le menu mobile si on clique sur un lien (cas du smartphone)
            const mobileMenu = document.getElementById('mobile-menu');
            const menuIcon = document.getElementById('menu-icon');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.add('fa-bars');
                menuIcon.classList.remove('fa-times');
            }

            // Calcul de la position avec un léger décalage pour la navbar
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = targetElement.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Effet de changement de style de la Navbar au scroll (déjà présent mais optimisé ici)
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('bg-darkBlue/90', 'backdrop-blur-md', 'py-2', 'shadow-2xl');
        navbar.classList.remove('py-3');
    } else {
        navbar.classList.remove('bg-darkBlue/90', 'backdrop-blur-md', 'py-2', 'shadow-2xl');
        navbar.classList.add('py-3');
    }
});

function toggleFAQ(id) {
    const answer = document.getElementById('ans-' + id);
    const icon = document.getElementById('icon-' + id);
    
    if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(45deg)';
    } else {
        answer.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}