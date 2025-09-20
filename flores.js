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
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 1 + 0.5;
        this.angle = Math.random() * 360;
        this.speedAngle = Math.random() * 0.1 + 0.05;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = '#ffcc00';
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.arc(Math.cos(i * Math.PI / 2) * this.size, Math.sin(i * Math.PI / 2) * this.size, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.fillStyle = '#ff9900';
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    update() {
        this.y += this.speedY;
        this.angle += this.speedAngle;
        
        if (this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = -this.size;
        }
    }
}

// Lógica de la animación de las flores
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < flores.length; i++) {
        flores[i].draw();
        flores[i].update();
    }
    if (flores.length < 50) {
        flores.push(new Flor());
    }
    requestAnimationFrame(animate);
}

// Generar flores iniciales y comenzar la animación
window.addEventListener('load', () => {
    for (let i = 0; i < 50; i++) {
        flores.push(new Flor());
    }
    animate();
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Arreglo de mensajes y su tiempo de aparición
const mensajes = [
    { tiempo: 1, texto: "Solo quería que supieras" },
    { tiempo: 5, texto: "Desde que te conocí..." },
    { tiempo: 10, texto: "Mi vida se llenó de color..." },
    { tiempo: 15, texto: "Y cada día contigo..." },
    { tiempo: 20, texto: "Es una bendición." },
    { tiempo: 25, texto: "Te amo, mi amor." },
    { tiempo: 30, texto: "Te amo, mucho incluso en los momentos que llegamos a pelear y nuestro arbol se tambalea pero quiero simplemente mostrarte que no eres espectadora y que este chico te ama." }
];

// Arreglo de tus fotos (REEMPLAZA ESTO CON TUS ARCHIVOS)
const fotos = [
    'ELENA1.jpg',
    'ELENA2.jpg',
    'elena3.jpg',
    'elena4.jpg',
    'elena5.jpg',
    'elena6.jpg',
    'elena7.jpg'
];

let mensajeIndex = 0;
let fotoIndex = 0;
const subtitulosDiv = document.getElementById('subtitulos');
const recuadroFotos = document.getElementById('recuadroFotos'); // NUEVA REFERENCIA

function cambiarSubtitulos() {
    const musica = document.getElementById('musicaFondo');
    
    if (mensajeIndex < mensajes.length && musica.currentTime >= mensajes[mensajeIndex].tiempo) {
        subtitulosDiv.textContent = mensajes[mensajeIndex].texto;
        mensajeIndex++;
    } else if (mensajeIndex >= mensajes.length) {
        subtitulosDiv.textContent = "";
    }
}

function cambiarFoto() {
    if (fotoIndex >= fotos.length) {
        fotoIndex = 0;
    }

    // Remueve la clase "activa" de la foto actual para ocultarla
    const fotosActivas = document.querySelectorAll('.recuadro-fotos img.activa');
    if (fotosActivas.length > 0) {
        fotosActivas[0].classList.remove('activa');
    }

    // Crea una nueva imagen y la agrega al contenedor
    const nuevaFoto = new Image();
    nuevaFoto.src = fotos[fotoIndex];
    nuevaFoto.classList.add('activa');
    recuadroFotos.appendChild(nuevaFoto);

    fotoIndex++;
}

// Función para reproducir la música y empezar las animaciones
function reproducirMusica() {
    const musica = document.getElementById('musicaFondo');
    musica.play();
    
    document.querySelector('.boton-musica').style.display = 'none';
    recuadroFotos.style.display = 'block'; // Muestra el recuadro de fotos
    
    cambiarFoto();
    setInterval(cambiarFoto, 5000);

    setInterval(cambiarSubtitulos, 1000);
}
