// La única función necesaria para el recuadro interactivo
function mostrarDetalles() {
    const seccionSorpresa = document.getElementById('seccion-sorpresa');
    const seccionDetalles = document.getElementById('seccion-detalles');

    // Oculta la sección inicial de sorpresa
    seccionSorpresa.style.display = 'none';
    
    // Muestra la sección de detalles que estaba oculta
    seccionDetalles.style.display = 'block';
}

// Nueva función para enviar la lista de deseos a WhatsApp
document.getElementById('form-deseos').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

    const deseos = document.getElementById('texto-deseos').value;

    if (deseos.trim() === '') {
        alert('Por favor, escribe algo en tu lista de deseos.');
        return;
    }

    const mensajeWhatsApp = `¡Hola, mi amor! Aquí está mi lista de deseos:\n\n${deseos}`;
    const urlWhatsApp = `https://wa.me/8681010250?text=${encodeURIComponent(mensajeWhatsApp)}`;

    window.open(urlWhatsApp, '_blank'); // Abre WhatsApp en una nueva pestaña
});