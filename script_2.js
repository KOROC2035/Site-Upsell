const generateEventId = () => 'wa_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

// On cible tous les boutons WhatsApp
document.querySelectorAll('.btn-whatsapp').forEach(button => {
    button.addEventListener('click', async (e) => {
        const eventId = generateEventId();
        
        // 1. Pixel Meta (Navigateur)
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact', {}, { eventID: eventId });
        }

        // 2. Appel à votre FastAPI (Serveur)
        // On n'attend pas la réponse pour ne pas bloquer l'ouverture de WhatsApp
        fetch('https://meta-capi-bridge.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event_id: eventId,
                url: window.location.href
            })
        });
        
        // Le lien WhatsApp s'ouvre normalement
    });
});

// Fonction pour récupérer la valeur d'un cookie par son nom
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Dans votre fonction de clic WhatsApp :
const eventData = {
    event_id: generateEventId(),
    url: window.location.href,
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc')
};