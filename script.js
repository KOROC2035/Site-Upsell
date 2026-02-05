// 1. On définit les fonctions en haut pour qu'elles soient accessibles partout
window.generateEventId = () => 'wa_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

window.getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

// 2. Le reste du code (Navbar, Menu, FAQ)
tailwind.config = { theme: { extend: { colors: { darkBlue: '#242a44', tealCustom: '#1e9090' } } } };

// 3. On attend que la page soit prête pour attacher les clics
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-whatsapp').forEach(button => {
        button.addEventListener('click', function(e) {
            const eventId = window.generateEventId();
            console.log('Clic détecté ! ID généré :', eventId);

            // A. Envoi au PIXEL
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Contact', {}, { eventID: eventId });
                console.log('Pixel : OK');
            } else {
                console.log('Pixel : Erreur (fbq non défini)');
            }

            // B. Envoi au SERVEUR (Render)
            fetch('https://meta-capi-bridge.onrender.com/track-whatsapp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event_id: eventId,
                    url: window.location.href,
                    fbp: window.getCookie('_fbp'),
                    fbc: window.getCookie('_fbc'),
                    test_code: 'TEST15470'
                })
            }).then(() => console.log('Serveur : OK'));
        });
    });
});