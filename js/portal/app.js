// js/portal/app.js
import { router } from './router.js';
import { store } from './store.js';

const app = document.getElementById('app');

// --- ESTADO DO BUILDER ---
let builderState = {
    name: 'Minha Plataforma',
    config: {
        template: 'minimal', 
        theme: 'dark',
        primaryColor: '#3B82F6',
        heroTitle: 'Domine a tecnologia com quem entende do assunto.',
        cardStyle: 'glass', 
        currentTab: 'landing',
        logoUrl: '',
        heroImgUrl: ''
    }
};

// --- ÍCONES ---
const icons = {
    projects: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    account: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    logout: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    chevron: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>`,
    alert: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
};

// --- LAYOUT GLOBAL ---
const layout = (content) => {
    const hash = window.location.hash;

    // Se for modo tela cheia (Create/Edit/View), retorna só o conteúdo
    // O CSS .fullscreen-mode vai cuidar de remover o grid do painel
    if (hash.includes('/create') || hash.includes('/edit') || hash.includes('/view/') || hash.includes('/manage/')) {
        return content;
    }
    // Modo Dashboard (Com Sidebar)
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
                <a href="#/" class="nav-link ${!hash || hash === '#/' ? 'active' : ''}">
                    ${icons.projects} <span class="nav-text">Meus Projetos</span>
                </a>
                <a href="#/account" class="nav-link ${hash === '#/account' ? 'active' : ''}">
                    ${icons.account} <span class="nav-text">Minha Conta</span>
                </a>
                <div class="nav-spacer"></div>
                <a href="login.html" class="nav-link logout">
                    ${icons.logout} <span class="nav-text">Sair</span>
                </a>
            </nav>
        </aside>
        
        <main class="main-viewport">${content}</main>

        <!-- MODAL DE EXCLUSÃO -->
        <div id="delete-modal-overlay" class="modal-overlay" style="display: none;">
            <div class="danger-modal">
                <div class="danger-icon">${icons.alert}</div>
                <h2>Excluir Plataforma?</h2>
                
                <div id="del-step-1">
                    <p>Esta ação não pode ser desfeita. Isso excluirá permanentemente a instância <strong id="del-target-name" style="color:#fff"></strong> e removerá todos os dados.</p>
                    <label>Digite o nome do projeto para confirmar:</label>
                    <input type="text" id="del-input-name" class="danger-input" placeholder="Nome do projeto" autocomplete="off">
                </div>

                <div id="del-step-2" style="display: none;">
                    <p>Última verificação de segurança.</p>
                    <label>Confirme sua senha para continuar:</label>
                    <input type="password" id="del-input-pass" class="danger-input" placeholder="Sua senha atual">
                </div>

                <div class="modal-actions">
                    <button id="btn-cancel-del" class="btn-ghost">Cancelar</button>
                    <button id="btn-confirm-del" class="btn-danger" disabled>Excluir Instância</button>
                </div>
            </div>
        </div>
    `;
};

// --- RENDERIZAÇÃO ---
function render() {
    const hash = window.location.hash || '#/';
    const content = router.match(hash);
    
    app.innerHTML = layout(content);
    
    // --- CORREÇÃO DO LAYOUT QUEBRADO ---
    // Se estivermos vendo o site (/view/) ou criando (/create), 
    // adicionamos a classe que remove o Grid do Dashboard.
    if (hash.includes('/create') || hash.includes('/view/') || hash.includes('/manage/')) {
        app.classList.add('fullscreen-mode');
        app.classList.remove('collapsed');
    } else {
        app.classList.remove('fullscreen-mode');
        // Restaura estado da sidebar do dashboard
        if (localStorage.getItem('aura-sidebar-collapsed') === 'true') {
            app.classList.add('collapsed');
        } else {
            app.classList.remove('collapsed');
        }
    }

    // Inicializa eventos específicos da rota
    if (hash.includes('/create')) {
        renderLivePreview();
        setTimeout(attachCreateEvents, 50);
    } else if (!hash.includes('/view/')) {
        // Se NÃO for visualização pública, anexa eventos do dashboard
        setTimeout(attachDashboardEvents, 50);
    }
}

// --- EVENTOS DO DASHBOARD ---
function attachDashboardEvents() {
    const toggleBtn = document.getElementById('toggle-sidebar');
    if (toggleBtn) {
        toggleBtn.onclick = () => {
            app.classList.toggle('collapsed');
            localStorage.setItem('aura-sidebar-collapsed', app.classList.contains('collapsed'));
        };
    }
}

// --- EVENTOS DO EDITOR (CREATE) ---
function attachCreateEvents() {
    // 1. Abas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            builderState.config.currentTab = btn.dataset.tab;
            
            const landingGroup = document.querySelector('.landing-only');
            if(landingGroup) landingGroup.style.display = btn.dataset.tab === 'landing' ? 'block' : 'none';
            
            renderLivePreview();
        };
    });

    // 2. Seletores Visuais
    document.querySelectorAll('.visual-option').forEach(opt => {
        opt.onclick = () => {
            const type = opt.dataset.theme ? 'theme' : 'template';
            const siblings = opt.parentNode.querySelectorAll('.visual-option');
            siblings.forEach(s => s.classList.remove('active'));
            opt.classList.add('active');

            if (type === 'theme') {
                builderState.config.theme = opt.dataset.theme;
            } else {
                builderState.config.template = opt.dataset.template;
            }
            renderLivePreview();
        };
    });

    // 3. Estilo de Card
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            builderState.config.cardStyle = btn.dataset.style;
            renderLivePreview();
        };
    });

    // 4. Inputs
    const inputs = {
        name: document.getElementById('p-name'),
        color: document.getElementById('p-color'),
        title: document.getElementById('p-hero-title'),
        logo: document.getElementById('p-logo'),
        heroImg: document.getElementById('p-hero-img')
    };

    if(inputs.name) inputs.name.oninput = (e) => { builderState.name = e.target.value; renderLivePreview(); };
    if(inputs.title) inputs.title.oninput = (e) => { builderState.config.heroTitle = e.target.value; renderLivePreview(); };
    if(inputs.logo) inputs.logo.oninput = (e) => { builderState.config.logoUrl = e.target.value; renderLivePreview(); };
    if(inputs.heroImg) inputs.heroImg.oninput = (e) => { builderState.config.heroImgUrl = e.target.value; renderLivePreview(); };
    
    if(inputs.color) inputs.color.oninput = (e) => { 
        builderState.config.primaryColor = e.target.value;
        const hexLabel = document.getElementById('hex-label');
        if(hexLabel) hexLabel.value = e.target.value.toUpperCase();
        renderLivePreview(); 
    };

    // 5. Salvar
    const btnSave = document.getElementById('btn-save-platform');
    if (btnSave) {
        btnSave.onclick = () => {
            const slug = builderState.name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            store.addPlatform({
                name: builderState.name,
                slug: slug,
                config: { ...builderState.config }
            });
            window.location.hash = '#/';
        };
    }
}

// --- RENDERIZADOR DO PREVIEW (MOCKUP BROWSER) ---
function renderLivePreview() {
    const canvas = document.getElementById('preview-canvas');
    if (!canvas) return;

    const { name, config } = builderState;
    const { primaryColor, heroTitle, template, cardStyle, theme, logoUrl, heroImgUrl } = config;
    
    // Atualiza URL fake
    const urlSlug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    document.getElementById('preview-url').innerText = `${urlSlug}.aura.app`;

    const isDark = theme === 'dark';
    const bgMain    = isDark ? '#09090b' : '#f8fafc';
    const bgSidebar = isDark ? '#000000' : '#ffffff';
    const textMain  = isDark ? '#ffffff' : '#0f172a';
    const textSec   = isDark ? '#a1a1aa' : '#64748b';
    const cardBg    = isDark ? '#18181b' : '#ffffff';
    const borderCol = isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0';

    const logoEl = logoUrl 
        ? `<img src="${logoUrl}" style="height: 28px; object-fit: contain;">` 
        : `<div style="font-weight:700; font-size:1.1rem; color:${textMain}; display:flex; align-items:center; gap:8px;">
             <span style="color:${primaryColor}">❖</span> ${name}
           </div>`;

    let contentHTML = '';

    if (config.currentTab === 'landing') {
        let heroHTML = '';

        if (template === 'minimal') {
            heroHTML = `
                <div class="lp-hero centered">
                    <h1 class="reveal-text">${heroTitle}</h1>
                    <p>A plataforma definitiva para aprender e evoluir.</p>
                    <div class="lp-cta-group">
                        <button class="lp-main-cta">Matricule-se</button>
                    </div>
                </div>
            `;
        } else if (template === 'split') {
            const imgContent = heroImgUrl 
                ? `<img src="${heroImgUrl}" class="split-real-img" alt="Hero">` 
                : `<div class="fake-img-placeholder"></div>`;

            heroHTML = `
                <div class="lp-hero split-layout">
                    <div class="split-content">
                        <h1 class="reveal-text" style="text-align:left;">${heroTitle}</h1>
                        <p style="text-align:left;">Educação sem fronteiras.</p>
                        <button class="lp-main-cta">Começar Agora</button>
                    </div>
                    <div class="split-visual">${imgContent}</div>
                </div>
            `;
        }

        contentHTML = `
            <div class="lp-wrapper">
                <nav class="lp-nav">
                    <div class="lp-logo">${logoEl}</div>
                    <div class="lp-nav-links">
                        <span>Cursos</span>
                        <span>Sobre</span>
                        <button class="lp-btn-login">Entrar</button>
                    </div>
                </nav>
                ${heroHTML}
                <div class="lp-section-title">Cursos em Destaque</div>
                <div class="lp-courses-grid">
                    ${[1, 2, 3].map(() => `
                        <div class="lp-course-card ${cardStyle}">
                            <div class="card-thumb-area"></div>
                            <div class="card-txt-area">
                                <div class="skel-line w-80"></div>
                                <div class="skel-line w-40"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        const courses = [
            { title: "Product Design Masterclass", progress: 75, total: 24, done: 18 },
            { title: "Frontend Avançado", progress: 32, total: 40, done: 12 },
            { title: "Marketing para Tech", progress: 0, total: 15, done: 0 },
            { title: "Soft Skills para Líderes", progress: 10, total: 10, done: 1 }
        ];

        contentHTML = `
            <div class="app-layout">
                <aside class="app-sidebar">
                    <div class="app-brand-area"><div class="app-logo-icon">❖</div></div>
                    <div class="app-menu">
                        <div class="app-item active"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
                        <div class="app-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
                        <div class="app-item"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
                    </div>
                    <div class="app-user"><div class="user-avatar-sm"></div></div>
                </aside>

                <main class="app-main">
                    <header class="app-header">
                        <div>
                            <h2 style="font-size:1.2rem; font-weight:700;">Dashboard</h2>
                            <p style="font-size:0.8rem; color:${textSec}">Bem-vindo de volta, Aluno.</p>
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
                            <div class="app-course-card ${cardStyle}">
                                <div class="acc-thumb" style="background: linear-gradient(135deg, ${primaryColor}${20 + (i*10)}, ${bgMain})"></div>
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
        `;
    }

    canvas.innerHTML = `
        <style>
            .preview-root { height: 100%; width: 100%; overflow-y: auto; background-color: ${bgMain}; color: ${textMain}; font-family: 'Inter', sans-serif; transition: background 0.3s, color 0.3s; }
            .lp-wrapper { padding: 40px; }
            .lp-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 60px; }
            .lp-nav-links { display: flex; gap: 20px; align-items: center; font-size: 0.85rem; }
            .lp-btn-login { background: ${primaryColor}; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; }
            .lp-hero h1 { font-size: 3rem; font-weight: 800; line-height: 1.1; margin-bottom: 20px; letter-spacing: -0.03em; }
            .lp-hero p { color: ${textSec}; font-size: 1.1rem; margin-bottom: 30px; }
            .centered { text-align: center; max-width: 600px; margin: 0 auto 60px; }
            .split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-bottom: 60px; }
            .lp-main-cta { background: ${primaryColor}; color: #fff; border: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; cursor: pointer; }
            .fake-img-placeholder { width: 100%; height: 250px; border: 1px dashed ${borderCol}; background: ${cardBg}; border-radius: 12px; }
            .split-real-img { width: 100%; height: auto; border-radius: 12px; }
            .lp-section-title { font-weight: 700; margin-bottom: 20px; font-size: 1.2rem; }
            .lp-courses-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .lp-course-card { height: 220px; background: ${cardBg}; border-radius: 16px; border: 1px solid ${borderCol}; overflow: hidden; display: flex; flex-direction: column; }
            .card-thumb-area { height: 120px; background: rgba(100,100,100,0.1); }
            .card-txt-area { padding: 15px; display: flex; flex-direction: column; gap: 8px; }
            .skel-line { height: 8px; background: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}; border-radius: 4px; }
            .w-80 { width: 80%; } .w-40 { width: 40%; }
            .app-layout { display: flex; height: 100%; }
            .app-sidebar { width: 72px; background: ${bgSidebar}; border-right: 1px solid ${borderCol}; display: flex; flex-direction: column; align-items: center; padding: 24px 0; gap: 40px; }
            .app-logo-icon { color: ${primaryColor}; font-size: 1.5rem; }
            .app-menu { display: flex; flex-direction: column; gap: 16px; width: 100%; align-items: center; }
            .app-item { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: ${textSec}; cursor: pointer; transition: 0.2s; }
            .app-item:hover { color: ${textMain}; background: ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; }
            .app-item.active { background: ${primaryColor}20; color: ${primaryColor}; }
            .app-user { margin-top: auto; }
            .user-avatar-sm { width: 32px; height: 32px; border-radius: 50%; background: #333; border: 2px solid ${primaryColor}; }
            .app-main { flex: 1; padding: 40px; overflow-y: auto; background: ${bgMain}; }
            .app-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
            .header-actions { display: flex; gap: 12px; }
            .notif-bell { width: 32px; height: 32px; border-radius: 50%; border: 1px solid ${borderCol}; }
            .continue-banner { background: linear-gradient(to right, ${primaryColor}20, ${cardBg}); border: 1px solid ${primaryColor}40; border-radius: 16px; padding: 24px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
            .cb-tag { font-size: 0.7rem; text-transform: uppercase; color: ${primaryColor}; font-weight: 700; letter-spacing: 0.05em; margin-bottom: 8px; display: block; }
            .cb-info h3 { font-size: 1.4rem; font-weight: 700; margin-bottom: 12px; }
            .cb-progress-row { display: flex; align-items: center; gap: 12px; font-size: 0.8rem; font-weight: 600; }
            .cb-bar-bg { width: 150px; height: 6px; background: rgba(0,0,0,0.2); border-radius: 100px; overflow: hidden; }
            .cb-bar-fill { height: 100%; background: ${primaryColor}; }
            .cb-play-btn { width: 48px; height: 48px; background: ${primaryColor}; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; box-shadow: 0 4px 15px ${primaryColor}60; }
            .section-label { font-size: 0.9rem; font-weight: 600; margin-bottom: 16px; color: ${textMain}; }
            .app-courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
            .app-course-card { background: ${cardBg}; border-radius: 14px; overflow: hidden; border: 1px solid ${borderCol}; transition: transform 0.2s; }
            .app-course-card:hover { transform: translateY(-3px); border-color: ${primaryColor}60; }
            .acc-thumb { height: 100px; width: 100%; }
            .acc-body { padding: 16px; }
            .acc-body h4 { font-size: 0.95rem; font-weight: 600; margin-bottom: 8px; line-height: 1.3; }
            .acc-meta { font-size: 0.75rem; color: ${textSec}; margin-bottom: 12px; }
            .acc-progress { height: 4px; background: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}; border-radius: 2px; overflow: hidden; }
            .acc-fill { height: 100%; background: ${primaryColor}; }
            .acc-start-btn { font-size: 0.75rem; color: ${primaryColor}; font-weight: 700; text-transform: uppercase; cursor: pointer; }
            .glass .app-course-card, .glass .lp-course-card { background: rgba(255,255,255,0.03); backdrop-filter: blur(10px); }
            .solid .app-course-card, .solid .lp-course-card { background: ${cardBg}; }
            .neon .app-course-card, .neon .lp-course-card { border-color: ${primaryColor}50; box-shadow: 0 0 10px ${primaryColor}20; }
            .reveal-text { animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; }
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        </style>
        <div class="preview-root">${contentHTML}</div>
    `;
}

// --- GLOBAL EXPORT (DELETE PROCESS) ---
let deleteTarget = { id: null, name: null };
window.initDeleteProcess = (id, name) => {
    deleteTarget = { id, name };
    const overlay = document.getElementById('delete-modal-overlay');
    const inputName = document.getElementById('del-input-name');
    const inputPass = document.getElementById('del-input-pass');
    const btnConfirm = document.getElementById('btn-confirm-del');
    const targetNameSpan = document.getElementById('del-target-name');
    const step1 = document.getElementById('del-step-1');
    const step2 = document.getElementById('del-step-2');

    overlay.style.display = 'flex';
    step1.style.display = 'block';
    step2.style.display = 'none';
    inputName.value = '';
    inputPass.value = '';
    btnConfirm.disabled = true;
    btnConfirm.innerText = 'Excluir Instância';
    targetNameSpan.innerText = name;
    
    setTimeout(() => inputName.focus(), 100);

    document.getElementById('btn-cancel-del').onclick = () => {
        overlay.style.display = 'none';
        deleteTarget = null;
    };

    inputName.oninput = () => {
        if (inputName.value === deleteTarget.name) {
            step1.style.display = 'none';
            step2.style.display = 'block';
            inputPass.focus();
        }
    };

    inputPass.oninput = () => {
        if (inputPass.value.length >= 3) {
            btnConfirm.disabled = false;
        } else {
            btnConfirm.disabled = true;
        }
    };

    btnConfirm.onclick = () => {
        if (!deleteTarget.id) return;
        btnConfirm.innerText = 'Excluindo...';
        setTimeout(() => {
            store.deletePlatform(deleteTarget.id);
            overlay.style.display = 'none';
            render(); 
        }, 1000);
    };
};

window.addEventListener('hashchange', render);
window.addEventListener('load', render);