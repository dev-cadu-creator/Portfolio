/* =========================================
   1. ANIMAÇÃO DE REVELAÇÃO (SCROLL REVEAL)
   ========================================= */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

reveals.forEach(reveal => {
    revealObserver.observe(reveal);
});

/* =========================================
   2. TELA DE BOAS-VINDAS (SPLASH SCREEN) E PARTÍCULAS
   ========================================= */
const splash = document.getElementById('splash-screen');
const canvas = document.getElementById('splash-canvas');
const ctx = canvas.getContext('2d');
const textElement = document.getElementById('typing-text');
const subText = document.getElementById('sub-text');
const phrase = "OLÁ, BEM-VINDO.";
let index = 0;
let animationId; // Para controlar la animación y detenerla después

// Ajustar el tamaño del Canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Sistema de Partículas (Estilo Dunks1980)
const particles = [];
function createParticles() {
    particles.length = 0; // Limpia el array si se redimensiona la pantalla
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speedX: (Math.random() - 0.5) * 1.2,
            speedY: (Math.random() - 0.5) * 1.2
        });
    }
}

function animateParticles() {
    // Si la pantalla de bienvenida ya está oculta, detenemos la animación para ahorrar CPU
    if (splash.classList.contains('hidden')) return; 

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 215, 0, 0.4)"; // Color amarillo para las partículas
    
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Rebote en los bordes
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });
    animationId = requestAnimationFrame(animateParticles);
}

// Efeito de Escrita (Typing)
function typeText() {
    if (index < phrase.length) {
        textElement.innerHTML += phrase.charAt(index);
        index++;
        setTimeout(typeText, 100); 
    } else {
        textElement.style.borderRight = "none";
        subText.classList.add('visible');
    }
}

/* =========================================
   3. SISTEMA DE LIGHTBOX (GALERIA)
   ========================================= */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.projeto-img-wrapper img').forEach(image => {
    image.onclick = () => {
        lightbox.style.display = "flex";
        lightboxImg.src = image.src;
    };
});

// Fechar ao clicar fora ou no X
lightbox.onclick = (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = "none";
    }
};

// Fechar com a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        lightbox.style.display = "none";
    }
});

/* =========================================
   4. INICIALIZAÇÃO GERAL
   ========================================= */
window.addEventListener('load', () => {
    resizeCanvas();
    createParticles();
    animateParticles(); // Enciende las partículas
    typeText();
    
    // Oculta el Splash Screen después de 4.5 segundos
    setTimeout(() => {
        splash.classList.add('hidden');
        cancelAnimationFrame(animationId); // Apaga las partículas de fondo
    }, 4500);
});

// Garante que o canvas se ajuste se o usuário redimensionar a janela
window.addEventListener('resize', () => {
    if (!splash.classList.contains('hidden')) {
        resizeCanvas();
        createParticles();
    }
});