// js/portal/views/create.js

export function createView() {
    return `
        <div class="pro-editor">
            <!-- SIDEBAR DE CONTROLES -->
            <aside class="editor-sidebar">
                <div class="sidebar-top">
                    <a href="#/" class="btn-back-editor">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                        Voltar ao Console
                    </a>
                    
                    <div class="editor-tabs">
                        <button class="tab-btn active" data-tab="landing">Landing Page</button>
                        <button class="tab-btn" data-tab="courses">App & Cursos</button>
                    </div>
                </div>

                <div class="scroll-area">
                    <!-- SEÇÃO: IDENTIDADE E TEMA -->
                    <section class="editor-group">
                        <label>Identidade & Tema</label>
                        
                        <input type="text" id="p-name" placeholder="Nome da Escola" class="pro-input" value="Minha Plataforma" style="margin-bottom: 12px;">
                        
                        <!-- Seletor de Tema (Light / Dark) -->
                        <div class="visual-grid" style="margin-bottom: 12px;">
                            <div class="visual-option active" data-theme="dark">
                                <div class="mini-preview mp-dark"></div>
                                <span class="opt-label">Dark Mode</span>
                            </div>
                            <div class="visual-option" data-theme="light">
                                <div class="mini-preview mp-light"></div>
                                <span class="opt-label">Light Mode</span>
                            </div>
                        </div>

                        <!-- Cor Primária -->
                        <div class="input-row">
                            <div style="position: relative; flex: 1;">
                                <input type="color" id="p-color" value="#3B82F6" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; border: none; background: none; cursor: pointer;">
                                <input type="text" value="#3B82F6" class="pro-input" style="padding-left: 40px; text-transform: uppercase;" readonly id="hex-label">
                            </div>
                        </div>
                    </section>

                    <!-- SEÇÃO: ASSETS (IMAGENS) -->
                    <section class="editor-group">
                        <label>Assets (Imagens)</label>
                        
                        <div style="margin-bottom: 10px;">
                            <span style="font-size: 0.75rem; color: #71717a; display: block; margin-bottom: 4px;">URL do Logo</span>
                            <input type="text" id="p-logo" placeholder="https://..." class="pro-input">
                        </div>

                        <!-- Imagem Hero (Só aparece se o template for Split) -->
                        <div id="hero-img-group">
                            <span style="font-size: 0.75rem; color: #71717a; display: block; margin-bottom: 4px;">Imagem de Capa (Hero)</span>
                            <input type="text" id="p-hero-img" placeholder="https://..." class="pro-input">
                        </div>
                    </section>

                    <!-- SEÇÃO: CONFIGURAÇÃO LANDING -->
                    <section class="editor-group tab-content landing-only">
                        <label>Layout da Landing</label>
                        
                        <div class="visual-grid">
                            <div class="visual-option active" data-template="minimal">
                                <div class="mini-preview mp-minimal"></div>
                                <span class="opt-label">Minimalista</span>
                            </div>
                            <div class="visual-option" data-template="split">
                                <div class="mini-preview mp-split"></div>
                                <span class="opt-label">Split Screen</span>
                            </div>
                        </div>

                        <div style="margin-top: 15px;">
                            <label>Headline Principal</label>
                            <textarea id="p-hero-title" class="pro-input" rows="3">Domine a tecnologia com quem entende do assunto.</textarea>
                        </div>
                    </section>

                    <!-- SEÇÃO: ESTILO CARDS -->
                    <section class="editor-group">
                        <label>Estilo dos Cards</label>
                        <div class="style-grid">
                            <button class="style-btn active" data-style="glass">Glass</button>
                            <button class="style-btn" data-style="solid">Solid</button>
                            <button class="style-btn" data-style="neon">Neon</button>
                        </div>
                    </section>
                </div>

                <div class="sidebar-footer">
                    <button id="btn-save-platform" class="launch-btn">
                        <span>Lançar Plataforma</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </button>
                </div>
            </aside>

            <!-- O PALCO -->
            <main class="editor-stage">
                <div class="browser-mockup">
                    <div class="browser-header">
                        <div class="traffic-lights"><span></span><span></span><span></span></div>
                        <div class="url-bar">
                            <span id="preview-url">minha-escola.aura.app</span>
                        </div>
                    </div>
                    <div id="preview-canvas" class="preview-canvas">
                        <!-- PREVIEW INJETADO AQUI -->
                    </div>
                </div>
            </main>
        </div>
    `;
}