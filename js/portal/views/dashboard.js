// js/portal/views/dashboard.js
import { store } from '../store.js';

export function dashboardView() {
    const data = store.get();
    
    // Renderiza Cards ou Empty State
    const cards = data.platforms.length > 0 ? data.platforms.map((p) => `
        <div class="card-platform">
            <div class="card-top">
                <div class="status-dot" style="color: ${p.primaryColor || '#3B82F6'}"></div>
                <div style="color: #666;">❖</div>
            </div>
            
            <div class="card-info">
                <h3>${p.name}</h3>
                <p>aura.app/${p.slug}</p>
            </div>

            <div class="card-actions">
                <a href="#/edit/${p.id}" class="btn-action btn-edit">Configurar</a>
                <button onclick="window.deletePlatform('${p.id}')" class="btn-action btn-delete">Remover</button>
            </div>
        </div>
    `).join('') : '<div style="color:#666; grid-column: 1/-1; text-align:center; padding: 40px;">Você ainda não tem projetos.</div>';

    return `
        <div class="main-content">
            <div class="header-page">
                <div>
                    <h1>Meus Projetos</h1>
                    <p>Gerencie suas plataformas de ensino.</p>
                </div>
                
                <!-- BOTÃO DE AÇÃO -->
                <a href="#/create" class="btn-primary">
                    <span>+</span> Novo Projeto
                </a>
            </div>

            <div class="grid-cards">
                ${cards}
            </div>
        </div>
    `;
}