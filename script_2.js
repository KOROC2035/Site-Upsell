const generateEventId = () => 'wa_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

// Fonction pour récupérer la valeur d'un cookie par son nom
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// On cible tous les boutons WhatsApp
document.querySelectorAll('.btn-whatsapp').forEach(button => {
    button.addEventListener('click', (e) => {
        const eventId = generateEventId();
        
        // 1. Pixel Meta (Navigateur)
        // On envoie l'événement 'Contact' avec l'ID pour la déduplication
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Contact', {}, { eventID: eventId });
        }

        // 2. Préparation des données pour le serveur
        const payload = {
            event_id: eventId,
            url: window.location.href,
            fbp: getCookie('_fbp'),
            fbc: getCookie('_fbc'),
            test_code: 'TEST15470' // Garde ton code de test ici pour l'instant
        };

        // 3. Appel à ton FastAPI sur Render (Serveur)
        // ATTENTION : Ajoute bien '/track-whatsapp' à la fin de ton URL Render
        fetch('https://meta-capi-bridge.onrender.com/track-whatsapp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            body: JSON.stringify(payload)
        })
        .then(response => console.log('CAPI : Signal envoyé au serveur'))
        .catch(err => console.error('CAPI Erreur:', err));
        
        // Le lien WhatsApp s'ouvre normalement car on n'a pas mis e.preventDefault()
    });
});