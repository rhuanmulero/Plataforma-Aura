// js/portal/views/dashboard.js
import { store } from '../store.js';

export function dashboardView() {
    const data = store.get();
    
    const iconSettings = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`;
    const iconTrash = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`;

    const cards = data.platforms.length > 0 ? data.platforms.map((p) => `
        <div class="card-platform">
            <div class="card-inner">
                <div class="card-header">
                    <div class="status-badge">
                        <span class="status-dot" style="background-color: ${p.config.primaryColor}; box-shadow: 0 0 12px ${p.config.primaryColor}80;"></span>
                        Online
                    </div>
                    ${p.config.logoUrl ? 
                        `<img src="${p.config.logoUrl}" style="height:20px; object-fit:contain;">` : 
                        `<div class="card-logo-mini" style="color:${p.config.primaryColor}">❖</div>`
                    }
                </div>
                
                <div class="card-body">
                    <h3>${p.name}</h3>
                    <!-- LINK CORRIGIDO: Sem sublinhado -->
                    <a href="#/view/${p.slug}" class="card-url" target="_blank" style="text-decoration: none;">
                        aura.app/${p.slug} <span>↗</span>
                    </a>
                </div>

                <div class="card-footer">
                    <a href="#/manage/${p.id}" class="btn-manage">
                        ${iconSettings}
                        <span>Gerenciar</span>
                    </a>
                    <!-- NOVA CHAMADA DE FUNÇÃO: Passa ID e NOME -->
                    <button onclick="window.initDeleteProcess('${p.id}', '${p.name}')" class="btn-delete-icon" title="Remover">
                        ${iconTrash}
                    </button>
                </div>
            </div>
            <div class="card-glow"></div>
        </div>
    `).join('') : '<div class="empty-state">Nenhum projeto encontrado.</div>';

    return `
        <div class="main-content">
            <header class="page-header">
                <div>
                    <h1>Console Principal</h1>
                    <p>Bem-vindo ao Aura. Suas instâncias estão operando normalmente.</p>
                </div>
                <a href="#/create" class="btn-add-new">+ Novo Projeto</a>
            </header>
            <div class="grid-cards">${cards}</div>
        </div>
    `;
}