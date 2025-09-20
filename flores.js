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

        // Dibujar los pétalos
        ctx.fillStyle = '#ffcc00';
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.arc(Math.cos(i * Math.PI / 2) * this.size, Math.sin(i * Math.PI / 2) * this.size, this.size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Dibujar el centro (tu adición, que es muy buena)
        ctx.fillStyle = '#ff9900';
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    update() {
        // Mover la flor hacia abajo
        this.y += this.speedY;
        this.angle += this.speedAngle;
        
        // Si la flor sale de la pantalla, la reseteamos arriba
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
    requestAnimationFrame(animate);
}

// --- Nuevas funciones para la sorpresa ---

const musicaFondo = document.getElementById('musicaFondo');
const subtitulosDiv = document.getElementById('subtitulos');
const recuadroFotos = document.getElementById('recuadroFotos');

// Lista de tus fotos (asegúrate de que los nombres de archivo sean EXACTOS)
const fotos = ["ELENA1.jpg", "ELENA2.jpg", "ELENA3.jpg", "ELENA4.jpg", "ELENA5.jpg", "ELENA6.jpg", "ELENA7.jpg"];
let indiceFotoActual = 0;

function cambiarFoto() {
    // 1. Eliminar cualquier foto existente para evitar acumulación
    recuadroFotos.innerHTML = '';

    // 2. Crear un nuevo elemento de imagen
    const nuevaFoto = document.createElement('img');
    nuevaFoto.src = fotos[indiceFotoActual];
    nuevaFoto.alt = "Foto de nosotros";

    // 3. Agregar la nueva foto al recuadro
    recuadroFotos.appendChild(nuevaFoto);

    // 4. Activar la nueva foto para la transición (con un pequeño retraso para que funcione)
    setTimeout(() => {
        nuevaFoto.classList.add('activa');
    }, 100);

    // 5. Moverse a la siguiente foto
    indiceFotoActual = (indiceFotoActual + 1) % fotos.length;
}

// Subtítulos sincronizados
const lineasCancion = [
    { texto: "Me haces tan feliz...", tiempo: 0 },
    { texto: "Cada día contigo es una aventura.", tiempo: 5 },
    { texto: "Tú eres mi todo.", tiempo: 10 },
    { texto: "Y siempre estaré aquí para ti.", tiempo: 15 },
    { texto: "¡Te amo!", tiempo: 20 },
    { texto: "Te amo, mucho incluso en los momentos que llegamos a pelear y nuestro árbol se tambalea pero quiero simplemente mostrarte que no eres espectadora y que este chico te ama.", tiempo: 25 },
    { texto: "", tiempo: 35 } // Final de los subtítulos
];
let indiceLinea = 0;

function mostrarSubtitulo() {
    if (indiceLinea < lineasCancion.length) {
        subtitulosDiv.textContent = lineasCancion[indiceLinea].texto;
        const siguienteLinea = lineasCancion[indiceLinea + 1];
        if (siguienteLinea) {
            const duracion = siguienteLinea.tiempo - lineasCancion[indiceLinea].tiempo;
            setTimeout(mostrarSubtitulo, duracion * 1000);
        }
        indiceLinea++;
    }
}

// Función principal para reproducir la música y empezar la magia
function reproducirMusica() {
    // Ocultar el botón
    const boton = document.querySelector('.boton-musica');
    boton.style.display = 'none';

    // Hacer visible el recuadro de las fotos
    recuadroFotos.style.display = 'block';

    // Iniciar el efecto de las flores
    for (let i = 0; i < 100; i++) {
        flores.push(new Flor());
    }
    animate();

    // Empezar a mostrar la primera foto
    cambiarFoto();
    // Y cambiarla cada 5 segundos
    setInterval(cambiarFoto, 5000);

    // Iniciar la música
    musicaFondo.play();
    
    // Iniciar los subtítulos
    mostrarSubtitulo();
}
