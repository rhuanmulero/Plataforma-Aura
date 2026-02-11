document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. HERO 3D TILT (A mesma lógica do Login) ---
    const heroSection = document.querySelector('.hero');
    const monolith = document.getElementById('tilt-hero');

    if (heroSection && monolith) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 40; 
            const yAxis = (window.innerHeight / 2 - e.pageY) / 40;

            monolith.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            monolith.style.transform = `rotateY(0deg) rotateX(0deg)`;
            monolith.style.transition = 'transform 0.6s ease-out';
        });

        heroSection.addEventListener('mouseenter', () => {
            monolith.style.transition = 'none';
        });
    }

    // --- 2. SPOTLIGHT EFFECT NOS CARDS (Efeito Vercel) ---
    const cards = document.querySelectorAll('.feature-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const glow = card.querySelector('.card-glow');
            if(glow) {
                glow.style.left = `${x - 200}px`; 
                glow.style.top = `${y - 200}px`;
            }
        });
    });

    // --- 3. NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            navbar.style.background = 'rgba(3, 3, 5, 0.8)';
            navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
        }
    });

});