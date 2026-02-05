const generateEventId = () => 'wa_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

document.querySelectorAll('.btn-whatsapp').forEach(button => {
    button.addEventListener('click', () => {
        const eventId = generateEventId();
        
        // A. ENVOI NAVIGATEUR (Pixel Meta)
        // C'est cette ligne qui manque dans ton Pixel Helper !
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact', {}, { eventID: eventId });
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
        .then(res => console.log('CAPI Serveur envoyé'))
        .catch(err => console.error('Erreur CAPI', err));
    });
});