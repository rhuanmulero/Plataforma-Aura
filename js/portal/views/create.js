export function createView() {
    return `
        <div class="pro-editor">
            <!-- PAINEL DE FERRAMENTAS (ESTILO FIGMA/CANVA) -->
            <aside class="editor-sidebar">
                <div class="sidebar-top">
                    <a href="#/" class="back-btn">←</a>
                    <div class="editor-tabs">
                        <button class="tab-btn active" data-tab="landing">Landing</button>
                        <button class="tab-btn" data-tab="courses">Cursos</button>
                    </div>
                </div>

                <div class="scroll-area">
                    <!-- SEÇÃO: IDENTIDADE -->
                    <section class="editor-group">
                        <label>Identidade da Marca</label>
                        <div class="input-stack">
                            <input type="text" id="p-name" placeholder="Nome da Escola" class="pro-input">
                            <div class="color-row">
                                <input type="color" id="p-color" value="#3B82F6">
                                <span id="hex-label">#3B82F6</span>
                            </div>
                        </div>
                    </section>

                    <!-- SEÇÃO: HERO (LANDING) -->
                    <section class="editor-group tab-content landing-only">
                        <label>Cabeçalho (Hero)</label>
                        <select id="p-hero-template" class="pro-input">
                            <option value="minimal">Minimalista (Centro)</option>
                            <option value="split">Split (Lado a Lado)</option>
                            <option value="glass">Glassmorphism (Moderno)</option>
                        </select>
                        <textarea id="p-hero-title" placeholder="Título Principal" class="pro-input"></textarea>
                    </section>

                    <!-- SEÇÃO: GRID DE CURSOS -->
                    <section class="editor-group">
                        <label>Estilo dos Cards de Curso</label>
                        <div class="card-style-grid">
                            <div class="style-opt active" data-style="glass">Vidro</div>
                            <div class="style-opt" data-style="solid">Sólido</div>
                            <div class="style-opt" data-style="neon">Neon</div>
                        </div>
                    </section>
                </div>

                <div class="sidebar-footer">
                    <button id="btn-save-platform" class="launch-btn">
                        <span>Lançar Aura</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </aside>

            <!-- O PALCO (VIEWPORT) -->
            <main class="editor-stage">
                <div class="viewport-header">
                    <div class="address-bar">
                        <span class="lock">🔒</span>
                        <span id="preview-url">sua-escola.aura.app</span>
                    </div>
                </div>
                
                <div id="preview-canvas" class="canvas-viewport">
                    <!-- Conteúdo Dinâmico Injetado -->
                </div>
            </main>
        </div>
    `;
}