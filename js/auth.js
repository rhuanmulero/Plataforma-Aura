document.addEventListener('DOMContentLoaded', () => {
    
    const cardWrapper = document.getElementById('card-wrapper');
    const body = document.body;
    
    const btnToRegister = document.getElementById('to-register');
    const btnToLogin = document.getElementById('to-login');

    // --- LÓGICA DE TILT & FLIP ---
    let isFlipped = false;
    let isHoveringCard = false;

    function applyTransform(tiltX, tiltY) {
        if (isFlipped) {
            cardWrapper.style.transform = `rotateY(180deg) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
        } else {
            cardWrapper.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
        }
    }

    function toggleFlip(state) {
        isFlipped = state;
        cardWrapper.classList.add('is-flipping');
        applyTransform(0, 0);

        if (state) {
            body.classList.add('invert-mode');
        } else {
            body.classList.remove('invert-mode');
        }

        setTimeout(() => {
            cardWrapper.classList.remove('is-flipping');
        }, 600);
    }

    btnToRegister.addEventListener('click', (e) => { e.preventDefault(); toggleFlip(true); });
    btnToLogin.addEventListener('click', (e) => { e.preventDefault(); toggleFlip(false); });

    cardWrapper.addEventListener('mouseenter', () => { isHoveringCard = true; applyTransform(0, 0); });
    cardWrapper.addEventListener('mouseleave', () => { isHoveringCard = false; });

    document.addEventListener('mousemove', (e) => {
        if (cardWrapper.classList.contains('is-flipping')) return;
        if (isHoveringCard) { applyTransform(0, 0); return; }

        const x = (window.innerWidth / 2 - e.pageX) / 70;
        const y = (window.innerHeight / 2 - e.pageY) / 70;
        applyTransform(x, y);
    });

    
    // Pega todos os formulários da página (Login e Registro)
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            // 1. Feedback visual (Simula carregamento)
            btn.innerText = "Autenticando...";
            btn.style.opacity = "0.7";
            btn.style.cursor = "wait";

            // 2. Aguarda 1 segundo e redireciona
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        });
    });

});