// js/portal/app.js
import { router } from './router.js';
import { store } from './store.js';

const app = document.getElementById('app');

// Estado local do Builder (Temporário antes de salvar no Store)
let builderState = {
    name: 'Minha Plataforma',
    config: {
        template: 'minimal', 
        primaryColor: '#3B82F6',
        heroTitle: 'Domine a tecnologia com quem entende do assunto.',
        cardStyle: 'glass', 
        currentTab: 'landing' 
    }
};

const icons = {
    projects: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    account: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    logout: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    chevron: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>`
};

// Layout base do sistema
const layout = (content) => {
    if (window.location.hash === '#/create' || window.location.hash.includes('#/edit')) {
        return content;
    }

    return `
        <aside class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <div class="brand">
                    <span class="logo-icon">❖</span> 
                    <span class="nav-text">Console</span>
                </div>
                <button id="toggle-sidebar" class="btn-collapse">${icons.chevron}</button>
            </div>
            <nav class="sidebar-nav">
                <a href="#/" class="nav-link ${window.location.hash === '#/' || !window.location.hash ? 'active' : ''}">
                    ${icons.projects} <span class="nav-text">Meus Projetos</span>
                </a>
                <a href="#/account" class="nav-link ${window.location.hash === '#/account' ? 'active' : ''}">
                    ${icons.account} <span class="nav-text">Minha Conta</span>
                </a>
                <div class="nav-spacer"></div>
                <a href="login.html" class="nav-link logout">
                    ${icons.logout} <span class="nav-text">Sair</span>
                </a>
            </nav>
        </aside>
        <main class="main-viewport">${content}</main>
    `;
};

function render() {
    const hash = window.location.hash || '#/';
    const content = router.match(hash);
    
    app.innerHTML = layout(content);
    
    // Define a classe do app se estiver colapsado (Sidebar)
    if (localStorage.getItem('aura-sidebar-collapsed') === 'true' && !hash.includes('/create')) {
        app.classList.add('collapsed');
    } else {
        app.classList.remove('collapsed');
    }

    // Se estiver no Create, inicia o preview
    if (hash === '#/create') {
        renderLivePreview();
    }

    setTimeout(attachEvents, 50); 
}

function attachEvents() {
    // 1. Lógica da Sidebar
    const toggleBtn = document.getElementById('toggle-sidebar');
    if (toggleBtn) {
        toggleBtn.onclick = () => {
            app.classList.toggle('collapsed');
            localStorage.setItem('aura-sidebar-collapsed', app.classList.contains('collapsed'));
        };
    }

    // 2. Lógica do Pro Editor (Create/Edit)
    if (document.querySelector('.pro-editor')) {
        
        // Troca de Abas (Landing vs Courses)
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                builderState.config.currentTab = btn.dataset.tab;
                renderLivePreview();
            };
        });

        // Inputs de Identidade
        const inputName = document.getElementById('p-name');
        const inputColor = document.getElementById('p-color');
        const inputHeroTitle = document.getElementById('p-hero-title');
        const selectTemplate = document.getElementById('p-hero-template');

        if (inputName) {
            inputName.oninput = (e) => { builderState.name = e.target.value || 'Sua Escola'; renderLivePreview(); };
            inputColor.oninput = (e) => { 
                builderState.config.primaryColor = e.target.value; 
                document.getElementById('hex-label').innerText = e.target.value.toUpperCase();
                renderLivePreview(); 
            };
            inputHeroTitle.oninput = (e) => { builderState.config.heroTitle = e.target.value; renderLivePreview(); };
            selectTemplate.onchange = (e) => { builderState.config.template = e.target.value; renderLivePreview(); };
        }

        // Estilo dos Cards
        document.querySelectorAll('.style-opt').forEach(opt => {
            opt.onclick = () => {
                document.querySelectorAll('.style-opt').forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                builderState.config.cardStyle = opt.dataset.style;
                renderLivePreview();
            };
        });

        // Botão de Lançamento (Salvar no Store)
        document.getElementById('btn-save-platform').onclick = () => {
            const slug = builderState.name.toLowerCase().trim().replace(/\s+/g, '-');
            store.addPlatform({
                name: builderState.name,
                slug: slug,
                config: builderState.config
            });
            window.location.hash = '#/';
        };
    }
}

function renderLivePreview() {
    const canvas = document.getElementById('preview-canvas');
    if (!canvas) return;

    const { name, config } = builderState;
    const urlText = name.toLowerCase().replace(/\s+/g, '-') + '.aura.app';
    document.getElementById('preview-url').innerText = urlText;

    if (config.currentTab === 'landing') {
        // --- PREVIEW DA LANDING PAGE ---
        canvas.innerHTML = `
            <div class="lp-preview lp-${config.template} animate-in">
                <nav class="lp-nav">
                    <div class="lp-logo">❖ ${name}</div>
                    <div class="lp-nav-links">
                        <span>Cursos</span>
                        <span>Sobre</span>
                        <button class="lp-btn-login" style="background: ${config.primaryColor}">Entrar</button>
                    </div>
                </nav>
                <div class="lp-hero">
                    <h1 class="reveal-text">${config.heroTitle}</h1>
                    <p>Aprenda de forma imersiva com a melhor tecnologia educacional do mercado.</p>
                    <div class="lp-cta-group">
                        <button class="lp-main-cta" style="background: ${config.primaryColor}">Começar Agora</button>
                        <button class="lp-sec-cta">Ver Cursos</button>
                    </div>
                </div>
                <div class="lp-courses-grid">
                    <div class="lp-course-card ${config.cardStyle}"></div>
                    <div class="lp-course-card ${config.cardStyle}"></div>
                    <div class="lp-course-card ${config.cardStyle}"></div>
                </div>
            </div>
        `;
    } else {
        // --- PREVIEW DA ÁREA DE CURSOS ---
        canvas.innerHTML = `
            <div class="app-preview animate-in">
                <aside class="app-sidebar">
                    <div class="app-logo">❖</div>
                    <div class="app-nav-item active" style="background: ${config.primaryColor}20; color: ${config.primaryColor}">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                    </div>
                    <div class="app-nav-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                    </div>
                </aside>
                <main class="app-content">
                    <header class="app-header">
                        <div class="app-header-left">
                            <h2>Meus Cursos</h2>
                            <p>Continue de onde você parou</p>
                        </div>
                        <div class="user-avatar" style="border: 2px solid ${config.primaryColor}"></div>
                    </header>
                    <div class="app-grid">
                        ${[1, 2, 3, 4].map(() => `
                            <div class="app-card ${config.cardStyle}">
                                <div class="card-thumb" style="background: linear-gradient(45deg, ${config.primaryColor}20, transparent)"></div>
                                <div class="card-info">
                                    <div class="skel-line" style="width: 80%"></div>
                                    <div class="skel-line" style="width: 50%; opacity: 0.5"></div>
                                    <div class="card-progress-bar"><div class="progress" style="width: 40%; background: ${config.primaryColor}"></div></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </main>
            </div>
        `;
    }
}

// Global functions para interações em cards do Dashboard
window.deletePlatform = (id) => {
    if(confirm('Deseja realmente remover esta instância? Todos os dados serão perdidos.')) {
        store.deletePlatform(id);
        render();
    }
};

window.addEventListener('hashchange', render);
window.addEventListener('load', render);