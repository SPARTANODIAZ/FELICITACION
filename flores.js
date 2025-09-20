// Obtener el lienzo y su contexto de dibujo
const canvas = document.getElementById('floresCanvas');
const ctx = canvas.getContext('2d');

// Ajustar el tamaño del canvas al de la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Arreglo para guardar todas las flores
const flores = [];

// Clase para crear una flor individual
class Flor {
    constructor() {
        this.x = Math.random() * canvas.width; // Posición horizontal aleatoria
        this.y = Math.random() * canvas.height; // Posición vertical aleatoria
        this.size = Math.random() * 10 + 5; // Tamaño aleatorio
        this.speedY = Math.random() * 1 + 0.5; // Velocidad de caída
        this.angle = Math.random() * 360; // Ángulo de rotación inicial
        this.speedAngle = Math.random() * 0.1 + 0.05; // Velocidad de rotación
    }

    // Método para dibujar la flor
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y); // Mover el contexto a la posición de la flor
        ctx.rotate(this.angle); // Rotar la flor

        // Dibuja los pétalos (círculos amarillos)
        ctx.fillStyle = '#ffcc00'; // Color amarillo
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.arc(Math.cos(i * Math.PI / 2) * this.size, Math.sin(i * Math.PI / 2) * this.size, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Dibuja el centro de la flor (círculo anaranjado)
        ctx.fillStyle = '#ff9900'; // Color anaranjado
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    // Método para actualizar la posición y rotación de la flor
    update() {
        this.y += this.speedY;
        this.angle += this.speedAngle;
        
        // Reiniciar la flor si se sale de la pantalla
        if (this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = -this.size; // La pone en la parte superior
        }
    }
}

// Función principal de animación
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

    // Dibujar y actualizar cada flor
    for (let i = 0; i < flores.length; i++) {
        flores[i].draw();
        flores[i].update();
    }

    // Generar nuevas flores si es necesario
    if (flores.length < 50) { // Mantener un número constante de flores
        flores.push(new Flor());
    }

    requestAnimationFrame(animate); // Crear un bucle de animación suave
}

// Iniciar la animación cuando la ventana se carga
window.addEventListener('load', () => {
    // Generar un conjunto inicial de flores
    for (let i = 0; i < 50; i++) {
        flores.push(new Flor());
    }
    animate();
});

// Actualizar el tamaño del canvas si la ventana cambia de tamaño
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});