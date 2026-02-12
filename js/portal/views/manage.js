// js/portal/views/manage.js
import { store } from '../store.js';
import { AIService } from '../ai-service.js';

// Ícones padronizados (Apple/Motion Style)
const lmsIcons = {
    dashboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    courses: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>`,
    finance: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
    settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
    chevron: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>`,
    back: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`
};

let currentTab = 'courses';
let currentPlatformId = null;

export function manageView(id) {
    currentPlatformId = id;
    const platform = store.getOne(id);
    if (!platform) return `<div style="color:white; padding:40px;">Plataforma não encontrada.</div>`;

    const isCollapsed = localStorage.getItem('aura-lms-collapsed') === 'true';

    return `
        <div class="lms-wrapper ${isCollapsed ? 'collapsed' : ''}" id="lms-wrapper">
            <aside class="lms-sidebar">
                <!-- HEADER COM BOTÃO TOGGLE -->
                <div class="lms-sidebar-header">
                    <div class="lms-brand">
                        <span class="lms-logo-mark" style="color:${platform.config.primaryColor}">❖</span>
                        <span class="lms-brand-text">${platform.name}</span>
                    </div>
                    <button class="btn-lms-toggle" onclick="window.toggleLmsSidebar()">
                        ${lmsIcons.chevron}
                    </button>
                </div>
                
                <nav class="lms-nav">
                    <a class="lms-link ${currentTab === 'dashboard' ? 'active' : ''}" onclick="window.switchTab('dashboard')">
                        ${lmsIcons.dashboard} <span>Dashboard</span>
                    </a>
                    <a class="lms-link ${currentTab === 'courses' ? 'active' : ''}" onclick="window.switchTab('courses')">
                        ${lmsIcons.courses} <span>Cursos</span>
                    </a>
                    <a class="lms-link ${currentTab === 'users' ? 'active' : ''}" onclick="window.switchTab('users')">
                        ${lmsIcons.users} <span>Usuários</span>
                    </a>
                    <a class="lms-link ${currentTab === 'finance' ? 'active' : ''}" onclick="window.switchTab('finance')">
                        ${lmsIcons.finance} <span>Financeiro</span>
                    </a>
                    <a class="lms-link ${currentTab === 'settings' ? 'active' : ''}" onclick="window.switchTab('settings')">
                        ${lmsIcons.settings} <span>Portal</span>
                    </a>
                </nav>

                <!-- BOTÃO VOLTAR COM SPAN PARA TEXTO -->
                <a href="#/" class="lms-back">
                    ${lmsIcons.back} <span>Voltar ao Console</span>
                </a>
            </aside>

            <main class="lms-content" id="lms-main-area">
                ${renderTabContent(currentTab, platform)}
            </main>
        </div>

        <!-- MODAL DE CRIAÇÃO IA -->
        <div id="ai-modal-overlay" class="ai-modal-overlay" style="display: none;">
            <div class="ai-modal">
                <h2 style="margin-bottom:20px; font-size:1.5rem;">Criar Curso com IA ⚡</h2>
                
                <div id="ai-step-1">
                    <label style="display:block; margin-bottom:8px; font-size:0.9rem; color:#a1a1aa">Sobre o que é o curso?</label>
                    <input type="text" id="ai-topic" class="ai-input" placeholder="Ex: Marketing Digital para Iniciantes">
                    
                    <label style="display:block; margin-bottom:8px; font-size:0.9rem; color:#a1a1aa">Público Alvo</label>
                    <input type="text" id="ai-audience" class="ai-input" placeholder="Ex: Empreendedores">

                    <label style="display:block; margin-bottom:8px; font-size:0.9rem; color:#a1a1aa">Gemini API Key (Temporário)</label>
                    <input type="password" id="ai-key" class="ai-input" placeholder="Cole sua chave API aqui">

                    <button id="btn-generate-structure" class="btn-primary" style="width:100%; justify-content:center; margin-top:10px;">
                        Gerar Estrutura
                    </button>
                </div>

                <div id="ai-step-loading" style="display:none; text-align:center; padding:40px;">
                    <div class="spinner" style="margin:0 auto 20px; border-left-color:#fff;"></div>
                    <p>A IA está criando a grade curricular...</p>
                </div>

                <div id="ai-step-result" style="display:none;">
                    <p style="color:#4ade80; margin-bottom:10px;">Estrutura Gerada com Sucesso!</p>
                    <div id="ai-preview-json" class="generated-structure"></div>
                    <div style="display:flex; gap:10px; margin-top:20px;">
                        <button onclick="document.getElementById('ai-modal-overlay').style.display='none'" class="btn-outline" style="flex:1">Cancelar</button>
                        <button id="btn-confirm-create" class="btn-primary" style="flex:1; justify-content:center;">Criar Curso</button>
                    </div>
                </div>

                <button onclick="document.getElementById('ai-modal-overlay').style.display='none'" class="btn-outline" style="margin-top:20px; width:100%; border:none; color:#52525b" id="btn-close-modal">Fechar</button>
            </div>
        </div>
    `;
}

window.toggleLmsSidebar = () => {
    const wrapper = document.getElementById('lms-wrapper');
    const isNowCollapsed = wrapper.classList.toggle('collapsed');
    localStorage.setItem('aura-lms-collapsed', isNowCollapsed);
};

// Renderiza o conteúdo da aba selecionada
function renderTabContent(tab, platform) {
    if (tab === 'courses') {
        // Mock de cursos existentes (se não houver no store)
        const courses = platform.courses || [];
        
        return `
            <div class="lms-header">
                <div>
                    <h1>Meus Cursos</h1>
                    <p style="color:#a1a1aa">Gerencie o conteúdo educacional da sua plataforma.</p>
                </div>
                <button onclick="window.openAICreator()" class="btn-primary">
                    ✨ Novo Curso com IA
                </button>
            </div>

            ${courses.length === 0 ? 
                `<div style="text-align:center; padding:80px; border:1px dashed #333; border-radius:12px; color:#52525b;">
                    Nenhum curso criado ainda. Use a IA para começar!
                </div>` : 
                `<div class="course-grid">
                    ${courses.map(c => `
                        <div class="course-card">
                            <div class="cc-thumb" style="background: linear-gradient(45deg, ${platform.config.primaryColor}20, #18181b)"></div>
                            <div class="cc-body">
                                <div class="cc-title">${c.title}</div>
                                <div class="cc-meta">${c.modules.length} Módulos • IA Generated</div>
                                <div class="cc-footer">
                                    <span style="font-size:0.8rem; color:#4ade80;">Publicado</span>
                                    <button class="btn-outline">Editar</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>`
            }
        `;
    }
    
    // Placeholders para outras abas
    return `
        <div class="lms-header">
            <h1>${tab.charAt(0).toUpperCase() + tab.slice(1)}</h1>
        </div>
        <div style="padding:40px; background:#18181b; border-radius:12px; color:#71717a;">
            Módulo em desenvolvimento...
        </div>
    `;
}

// --- LÓGICA DE INTERAÇÃO (Window Globals) ---

// Troca de Abas
window.switchTab = (tab) => {
    currentTab = tab;
    // Re-renderiza a view inteira (simples) ou apenas o conteúdo
    const platform = store.getOne(currentPlatformId);
    document.getElementById('lms-main-area').innerHTML = renderTabContent(tab, platform);
    
    // Atualiza classes ativas
    document.querySelectorAll('.lms-link').forEach(l => l.classList.remove('active'));
    // (Simplificado: na prática selecionaríamos pelo índice ou data-attr)
};

// Abrir Modal IA
window.openAICreator = () => {
    document.getElementById('ai-modal-overlay').style.display = 'flex';
    document.getElementById('ai-step-1').style.display = 'block';
    document.getElementById('ai-step-loading').style.display = 'none';
    document.getElementById('ai-step-result').style.display = 'none';
    document.getElementById('btn-close-modal').style.display = 'block';
};

// Lógica de Geração IA
let generatedCourseData = null;

// Escuta eventos globais apenas uma vez (para evitar duplicação em re-renders)
if (!window.aiEventsAttached) {
    document.addEventListener('click', async (e) => {
        if (e.target.id === 'btn-generate-structure') {
            const topic = document.getElementById('ai-topic').value;
            const audience = document.getElementById('ai-audience').value;
            const apiKey = document.getElementById('ai-key').value;

            if (!topic || !apiKey) {
                alert('Preencha o tema e a API Key!');
                return;
            }

            // UI Loading
            document.getElementById('ai-step-1').style.display = 'none';
            document.getElementById('ai-step-loading').style.display = 'block';
            document.getElementById('btn-close-modal').style.display = 'none';

            try {
                // Chama o Serviço de IA
                const structure = await AIService.generateCourseStructure(topic, audience, apiKey);
                generatedCourseData = structure;

                // Mostra Resultado
                document.getElementById('ai-step-loading').style.display = 'none';
                document.getElementById('ai-step-result').style.display = 'block';
                
                // Renderiza prévia simples
                const previewHtml = structure.modules.map(m => 
                    `<div><strong>${m.title}</strong><ul>${m.lessons.map(l => `<li>${l.title}</li>`).join('')}</ul></div>`
                ).join('');
                document.getElementById('ai-preview-json').innerHTML = previewHtml;

            } catch (err) {
                alert('Erro na IA: ' + err.message);
                window.openAICreator(); // Reseta
            }
        }

        if (e.target.id === 'btn-confirm-create') {
            if (!generatedCourseData) return;

            // Salva no Store
            const platform = store.getOne(currentPlatformId);
            if (!platform.courses) platform.courses = [];
            
            platform.courses.push(generatedCourseData);
            store.updatePlatform(currentPlatformId, { courses: platform.courses });

            // Fecha e Atualiza
            document.getElementById('ai-modal-overlay').style.display = 'none';
            window.switchTab('courses'); // Refresh grid
        }
    });
    window.aiEventsAttached = true;
}