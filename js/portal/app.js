import { router } from './router.js';
import { store } from './store.js';

const app = document.getElementById('app');

// Ícones SVG para a Sidebar
const icons = {
    projects: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    account: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    logout: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
    chevron: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`
};

// Layout Global com Sidebar Colapsável
const layout = (content) => `
    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="brand">
                <span class="logo-icon">❖</span> 
                <span class="nav-text">Console</span>
            </div>
            <button id="toggle-sidebar" class="btn-collapse">
                ${icons.chevron}
            </button>
        </div>
        
        <nav class="sidebar-nav">
            <a href="#/" class="nav-link ${window.location.hash === '#/' || window.location.hash === '' ? 'active' : ''}">
                ${icons.projects}
                <span class="nav-text">Meus Projetos</span>
            </a>
            <a href="#/account" class="nav-link ${window.location.hash === '#/account' ? 'active' : ''}">
                ${icons.account}
                <span class="nav-text">Minha Conta</span>
            </a>
            
            <div class="nav-spacer"></div>
            
            <a href="login.html" class="nav-link logout">
                ${icons.logout}
                <span class="nav-text">Sair</span>
            </a>
        </nav>
    </aside>
    
    <main class="main-viewport">
        ${content}
    </main>
`;

function render() {
    const content = router.match(window.location.hash);
    app.innerHTML = layout(content);
    
    // Restaura estado da sidebar
    if (localStorage.getItem('aura-sidebar-collapsed') === 'true') {
        app.classList.add('collapsed');
    }

    // Delay curto para garantir que o DOM foi injetado antes de anexar eventos
    setTimeout(attachEvents, 20); 
}

function attachEvents() {
    // 1. Lógica do Toggle da Sidebar
    const toggleBtn = document.getElementById('toggle-sidebar');
    if (toggleBtn) {
        toggleBtn.onclick = () => {
            app.classList.toggle('collapsed');
            const isCollapsed = app.classList.contains('collapsed');
            localStorage.setItem('aura-sidebar-collapsed', isCollapsed);
        };
    }

    // 2. Lógica do Formulário (Create/Edit)
    const form = document.getElementById('platform-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const mode = form.dataset.mode;
            const id = form.dataset.id;
            
            const payload = {
                name: document.getElementById('p-name').value,
                slug: document.getElementById('p-slug').value,
                primaryColor: document.getElementById('p-color').value
            };

            if (mode === 'create') store.addPlatform(payload);
            else store.updatePlatform(id, payload);
            
            window.location.hash = '#/';
        };
    }
}

// Funções Globais (chamadas por onclick nos cards)
window.deletePlatform = (id) => {
    if(confirm('Deseja realmente remover este projeto?')) {
        store.deletePlatform(id);
        render(); // Re-renderiza a dashboard
    }
};

window.addEventListener('hashchange', render);
window.addEventListener('load', render);