import { store } from '../store.js';

export function createView() {

    return `
        <div class="main-content">
            <div class="header-page">
                <h1>Nova Plataforma</h1>
                <a href="#/" class="btn-new" style="background:transparent; color:#fff; border:1px solid #333;" data-link>Cancelar</a>
            </div>

            <div style="max-width: 500px; background: rgba(255,255,255,0.03); padding: 40px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <form id="create-form">
                    <div style="margin-bottom: 20px;">
                        <label style="display:block; margin-bottom:8px; color:#888;">Nome da Escola/Empresa</label>
                        <input type="text" id="p-name" placeholder="Ex: Start Academy" 
                            style="width:100%; padding:12px; background:#111; border:1px solid #333; color:#fff; border-radius:6px;" required>
                    </div>
                    
                    <div style="margin-bottom: 30px;">
                        <label style="display:block; margin-bottom:8px; color:#888;">URL Desejada (Slug)</label>
                        <input type="text" id="p-slug" placeholder="ex: start-academy" 
                             style="width:100%; padding:12px; background:#111; border:1px solid #333; color:#fff; border-radius:6px;" required>
                    </div>

                    <button type="submit" class="btn-new" style="width:100%; border:none; cursor:pointer;">
                        Lançar Instância 🚀
                    </button>
                </form>
            </div>
        </div>
    `;
}