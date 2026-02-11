// js/portal/app.js
import { router } from './router.js';
import { store } from './store.js';

const app = document.getElementById('app');

// Layout Global
const layout = (content) => `
    <aside class="sidebar">
        <!-- Mudança de Nome aqui -->
        <div class="brand"><span>❖</span> Console</div>
        <nav>
            <a href="#/" class="nav-link active">Meus Projetos</a>
            <a href="#/account" class="nav-link">Minha Conta</a>
            
            <div style="margin-top:auto"></div>
            <a href="login.html" class="nav-link" style="color: #666;">Sair</a>
        </nav>
    </aside>
    ${content}
`;

// Função Principal de Renderização
function render() {
    const content = router.match(window.location.hash);
    app.innerHTML = layout(content);
    
    // IMPORTANTE: Reatribuir eventos APÓS o HTML existir na tela
    setTimeout(attachEvents, 50); 
}

// Lógica de Eventos (O que faz o botão funcionar)
function attachEvents() {
    const form = document.getElementById('platform-form');
    
    if (form) {
        // Remove listener antigo para não duplicar (segurança)
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        newForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const mode = newForm.dataset.mode;
            const id = newForm.dataset.id;
            
            const name = document.getElementById('p-name').value;
            const slug = document.getElementById('p-slug').value;
            const color = document.getElementById('p-color').value;

            // Validação simples
            if(!name || !slug) return alert('Preencha os campos obrigatórios');

            const payload = { name, slug, primaryColor: color };

            if (mode === 'create') {
                store.addPlatform(payload);
            } else {
                store.updatePlatform(id, payload);
            }
            
            // Força volta para home
            window.location.hash = '#/';
        });
    }
}

// Funções Globais
window.deletePlatform = (id) => {
    if(confirm('Tem certeza que deseja remover este projeto?')) {
        store.deletePlatform(id);
        render();
    }
};

// Escuta mudanças na URL e carregamento inicial
window.addEventListener('hashchange', render);
window.addEventListener('load', render);