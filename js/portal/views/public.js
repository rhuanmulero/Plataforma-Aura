// js/portal/views/public.js
import { store } from '../store.js';

export function publicView(slug) {
    // 1. Busca a plataforma pelo slug
    const platforms = store.get().platforms;
    const platform = platforms.find(p => p.slug === slug);

    if (!platform) {
        return `
            <div style="height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#000; color:#fff;">
                <h1 style="font-size:3rem; margin-bottom:20px;">404</h1>
                <p>Instância não encontrada.</p>
                <a href="#/" style="margin-top:20px; color:#3B82F6;">Voltar ao Console</a>
            </div>
        `;
    }

    const { name, config } = platform;
    // Estado interno para alternar entre Landing e App
    // Como o router recarrega a view, usamos window para manter estado simples ou recriamos a logica
    // Para simplificar, vamos renderizar a Landing por padrão, e injetar o script para alternar.
    
    // PREPARAÇÃO DAS VARIÁVEIS CSS (Igual ao preview)
    const isDark = config.theme === 'dark';
    const bgMain    = isDark ? '#09090b' : '#f8fafc';
    const bgSidebar = isDark ? '#000000' : '#ffffff';
    const textMain  = isDark ? '#ffffff' : '#0f172a';
    const textSec   = isDark ? '#a1a1aa' : '#64748b';
    const cardBg    = isDark ? '#18181b' : '#ffffff';
    const borderCol = isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0';

    // LOGO
    const logoEl = config.logoUrl 
        ? `<img src="${config.logoUrl}" style="height: 32px; object-fit: contain;">` 
        : `<div style="font-weight:700; font-size:1.2rem; color:${textMain}; display:flex; align-items:center; gap:8px;">
             <span style="color:${config.primaryColor}">❖</span> ${name}
           </div>`;

    // HERO IMAGE
    const imgContent = config.heroImgUrl 
        ? `<img src="${config.heroImgUrl}" class="split-real-img" alt="Hero">` 
        : `<div class="fake-img-placeholder"></div>`;

    // --- HTML DA LANDING PAGE ---
    let heroHTML = '';
    if (config.template === 'minimal') {
        heroHTML = `
            <div class="lp-hero centered">
                <h1 class="reveal-text">${config.heroTitle}</h1>
                <p>A plataforma definitiva para aprender e evoluir.</p>
                <div class="lp-cta-group">
                    <button class="lp-main-cta btn-enter-app">Matricule-se</button>
                </div>
            </div>
        `;
    } else {
        heroHTML = `
            <div class="lp-hero split-layout">
                <div class="split-content">
                    <h1 class="reveal-text" style="text-align:left;">${config.heroTitle}</h1>
                    <p style="text-align:left;">Educação sem fronteiras.</p>
                    <button class="lp-main-cta btn-enter-app">Começar Agora</button>
                </div>
                <div class="split-visual">${imgContent}</div>
            </div>
        `;
    }

    const landingHTML = `
        <div id="view-landing" class="view-section">
            <div class="lp-wrapper">
                <nav class="lp-nav">
                    <div class="lp-logo">${logoEl}</div>
                    <div class="lp-nav-links">
                        <span>Cursos</span>
                        <span>Sobre</span>
                        <button class="lp-btn-login btn-enter-app">Entrar</button>
                    </div>
                </nav>
                ${heroHTML}
                <div class="lp-section-title">Cursos em Destaque</div>
                <div class="lp-courses-grid">
                    ${[1, 2, 3].map(() => `
                        <div class="lp-course-card ${config.cardStyle}">
                            <div class="card-thumb-area"></div>
                            <div class="card-txt-area">
                                <div class="skel-line w-80"></div>
                                <div class="skel-line w-40"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    // --- HTML DA ÁREA DO ALUNO (APP) ---
    const courses = [
        { title: "Product Design Masterclass", progress: 75, total: 24, done: 18 },
        { title: "Frontend Avançado", progress: 32, total: 40, done: 12 },
        { title: "Marketing para Tech", progress: 0, total: 15, done: 0 },
        { title: "Soft Skills para Líderes", progress: 10, total: 10, done: 1 }
    ];

    const appHTML = `
        <div id="view-app" class="view-section" style="display: none; height: 100vh;">
            <div class="app-layout">
                <aside class="app-sidebar">
                    <div class="app-brand-area" style="cursor:pointer;" id="btn-back-home">
                        <div class="app-logo-icon">❖</div>
                    </div>
                    <div class="app-menu">
                        <div class="app-item active">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                        </div>
                        <div class="app-item">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                        </div>
                    </div>
                    <div class="app-user"><div class="user-avatar-sm"></div></div>
                </aside>
                <main class="app-main">
                    <header class="app-header">
                        <div>
                            <h2 style="font-size:1.5rem; font-weight:700;">Dashboard</h2>
                            <p style="font-size:0.9rem; color:${textSec}">Bem-vindo de volta.</p>
                        </div>
                        <div class="header-actions">
                            <div class="notif-bell"></div>
                        </div>
                    </header>
                    
                    <section class="continue-banner">
                        <div class="cb-info">
                            <span class="cb-tag">Continue estudando</span>
                            <h3>${courses[0].title}</h3>
                            <div class="cb-progress-row">
                                <div class="cb-bar-bg"><div class="cb-bar-fill" style="width: ${courses[0].progress}%"></div></div>
                                <span>${courses[0].progress}%</span>
                            </div>
                        </div>
                        <div class="cb-play-btn">▶</div>
                    </section>

                    <div class="section-label">Meus Cursos</div>
                    <div class="app-courses-grid">
                        ${courses.map((course, i) => `
                            <div class="app-course-card ${config.cardStyle}">
                                <div class="acc-thumb" style="background: linear-gradient(135deg, ${config.primaryColor}${20 + (i*10)}, ${bgMain})"></div>
                                <div class="acc-body">
                                    <h4>${course.title}</h4>
                                    <div class="acc-meta"><span>${course.done}/${course.total} aulas</span></div>
                                    ${course.progress > 0 ? `<div class="acc-progress"><div class="acc-fill" style="width: ${course.progress}%"></div></div>` : `<div class="acc-start-btn">Iniciar Curso</div>`}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </main>
            </div>
        </div>
    `;

    // --- SCRIPT DE INTERAÇÃO (LOGIN/LOGOUT FAKE) ---
    // Usamos setTimeout para garantir que o DOM foi inserido antes de adicionar listeners
    setTimeout(() => {
        const landing = document.getElementById('view-landing');
        const app = document.getElementById('view-app');
        
        // Botões de "Entrar/Matricular" levam para o App
        document.querySelectorAll('.btn-enter-app').forEach(btn => {
            btn.onclick = () => {
                landing.style.display = 'none';
                app.style.display = 'block';
            };
        });

        // Clicar no logo do app volta para a Landing
        const homeBtn = document.getElementById('btn-back-home');
        if(homeBtn) homeBtn.onclick = () => {
            app.style.display = 'none';
            landing.style.display = 'block';
        };
    }, 100);

    // --- MONTAGEM FINAL ---
    return `
        <div class="public-root">
            ${landingHTML}
            ${appHTML}
        </div>
        <style>
            .public-root {
                min-height: 100vh;
                background-color: ${bgMain}; color: ${textMain};
                font-family: 'Inter', sans-serif;
            }

            /* REPLICAÇÃO DOS ESTILOS DO APP.JS (SEM ESCOPO DO PREVIEW) */
            .lp-wrapper { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
            .lp-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 80px; }
            .lp-nav-links { display: flex; gap: 32px; align-items: center; font-size: 0.95rem; font-weight: 500; }
            .lp-btn-login { background: ${config.primaryColor}; color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.2s; }
            .lp-btn-login:hover { transform: scale(1.05); }

            .lp-hero h1 { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 24px; letter-spacing: -0.03em; }
            .lp-hero p { color: ${textSec}; font-size: 1.25rem; margin-bottom: 40px; }
            .centered { text-align: center; max-width: 800px; margin: 0 auto 100px; }
            .split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-bottom: 100px; }

            .lp-main-cta { background: ${config.primaryColor}; color: #fff; border: none; padding: 16px 32px; border-radius: 8px; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: transform 0.2s; }
            .lp-main-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 20px ${config.primaryColor}40; }

            .fake-img-placeholder { width: 100%; height: 400px; border: 1px dashed ${borderCol}; background: ${cardBg}; border-radius: 20px; }
            .split-real-img { width: 100%; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }

            .lp-section-title { font-weight: 800; margin-bottom: 30px; font-size: 2rem; }
            .lp-courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; }
            
            .lp-course-card { height: 300px; background: ${cardBg}; border-radius: 20px; border: 1px solid ${borderCol}; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.3s; }
            .lp-course-card:hover { transform: translateY(-5px); }
            .card-thumb-area { height: 160px; background: linear-gradient(to bottom, rgba(100,100,100,0.1), transparent); }
            .card-txt-area { padding: 24px; display: flex; flex-direction: column; gap: 12px; }
            .skel-line { height: 12px; background: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; border-radius: 6px; }
            .w-80 { width: 80%; } .w-40 { width: 40%; }

            /* APP STYLES */
            .app-layout { display: flex; height: 100vh; overflow: hidden; }
            .app-sidebar { width: 80px; background: ${bgSidebar}; border-right: 1px solid ${borderCol}; display: flex; flex-direction: column; align-items: center; padding: 30px 0; gap: 40px; z-index: 10; }
            .app-logo-icon { color: ${config.primaryColor}; font-size: 2rem; font-weight: bold; }
            
            .app-menu { display: flex; flex-direction: column; gap: 16px; width: 100%; align-items: center; }
            .app-item { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: ${textSec}; cursor: pointer; transition: 0.2s; }
            .app-item:hover { color: ${textMain}; background: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; }
            .app-item.active { background: ${config.primaryColor}20; color: ${config.primaryColor}; }
            
            .app-user { margin-top: auto; }
            .user-avatar-sm { width: 40px; height: 40px; border-radius: 50%; background: #333; border: 2px solid ${config.primaryColor}; }

            .app-main { flex: 1; padding: 40px 60px; overflow-y: auto; background: ${bgMain}; }
            .app-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
            .notif-bell { width: 40px; height: 40px; border-radius: 50%; border: 1px solid ${borderCol}; background: ${cardBg}; cursor: pointer; }

            .continue-banner {
                background: linear-gradient(to right, ${config.primaryColor}20, ${cardBg});
                border: 1px solid ${config.primaryColor}40;
                border-radius: 24px; padding: 40px;
                display: flex; justify-content: space-between; align-items: center;
                margin-bottom: 60px; position: relative; overflow: hidden;
            }
            .cb-tag { font-size: 0.8rem; text-transform: uppercase; color: ${config.primaryColor}; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 8px; display: block; }
            .cb-info h3 { font-size: 2rem; font-weight: 800; margin-bottom: 16px; }
            .cb-progress-row { display: flex; align-items: center; gap: 16px; font-size: 1rem; font-weight: 600; }
            .cb-bar-bg { width: 200px; height: 8px; background: rgba(0,0,0,0.2); border-radius: 100px; overflow: hidden; }
            .cb-bar-fill { height: 100%; background: ${config.primaryColor}; }
            .cb-play-btn { width: 64px; height: 64px; background: ${config.primaryColor}; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; box-shadow: 0 10px 30px ${config.primaryColor}60; cursor: pointer; transition: transform 0.2s; }
            .cb-play-btn:hover { transform: scale(1.1); }

            .section-label { font-size: 1.2rem; font-weight: 700; margin-bottom: 24px; color: ${textMain}; }
            .app-courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; }

            .app-course-card { background: ${cardBg}; border-radius: 16px; overflow: hidden; border: 1px solid ${borderCol}; transition: transform 0.2s; cursor: pointer; }
            .app-course-card:hover { transform: translateY(-5px); border-color: ${config.primaryColor}60; }
            .acc-thumb { height: 140px; width: 100%; }
            .acc-body { padding: 20px; }
            .acc-body h4 { font-size: 1.1rem; font-weight: 700; margin-bottom: 8px; line-height: 1.3; }
            .acc-meta { font-size: 0.85rem; color: ${textSec}; margin-bottom: 16px; }
            
            .acc-progress { height: 6px; background: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}; border-radius: 3px; overflow: hidden; }
            .acc-fill { height: 100%; background: ${config.primaryColor}; }
            .acc-start-btn { font-size: 0.85rem; color: ${config.primaryColor}; font-weight: 700; text-transform: uppercase; }

            /* ESTILOS DE CARD */
            .glass .app-course-card, .glass .lp-course-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); }
            .solid .app-course-card, .solid .lp-course-card { background: ${cardBg}; }
            .neon .app-course-card, .neon .lp-course-card { border-color: ${config.primaryColor}50; box-shadow: 0 0 15px ${config.primaryColor}20; }
            
            .reveal-text { animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

            @media (max-width: 768px) {
                .lp-hero h1 { font-size: 2.5rem; }
                .split-layout { grid-template-columns: 1fr; }
                .app-main { padding: 20px; }
                .continue-banner { flex-direction: column; align-items: flex-start; gap: 20px; }
                .cb-play-btn { align-self: flex-end; }
            }
        </style>
    `;
}