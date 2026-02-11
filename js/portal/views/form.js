// js/portal/views/form.js
import { store } from '../store.js';

export function formView(id = null) {
    const isEdit = !!id;
    let data = { name: '', slug: '', primaryColor: '#3B82F6' };

    if (isEdit) {
        const found = store.getOne(id);
        if (found) data = { ...found };
    }

    return `
        <div class="form-view-container">
            <div class="solid-form-card">
                <div class="form-header">
                    <h2>${isEdit ? 'Editar' : 'Criar'} Projeto</h2>
                    <p>Defina a identidade da sua nova plataforma.</p>
                </div>

                <form id="platform-form" data-mode="${isEdit ? 'edit' : 'create'}" data-id="${id || ''}">
                    
                    <div class="input-group">
                        <label>Nome do Projeto</label>
                        <input type="text" id="p-name" class="input-field" 
                            placeholder="Ex: Rocket Academy" value="${data.name}" autocomplete="off">
                    </div>

                    <div class="input-group">
                        <label>URL (Slug)</label>
                        <input type="text" id="p-slug" class="input-field" 
                            placeholder="ex: rocket-academy" value="${data.slug}" autocomplete="off">
                    </div>

                    <div class="input-group">
                        <label>Cor de Destaque</label>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <input type="color" id="p-color" value="${data.primaryColor}" 
                                style="border:none; width:40px; height:40px; background:none; cursor:pointer;">
                            <span style="font-size:0.8rem; color:#666;">Selecione a cor</span>
                        </div>
                    </div>

                    <button type="submit" class="btn-submit">
                        ${isEdit ? 'Salvar Alterações' : 'Criar Plataforma'}
                    </button>
                    
                    <a href="#/" class="btn-secondary" style="margin-top: 12px;">Cancelar</a>

                </form>
            </div>
        </div>
    `;
}