export function createView() {
    return `
        <div class="creator-container">
            <!-- COLUNA DE CONTROLES -->
            <aside class="creator-controls">
                <div class="controls-header">
                    <a href="#/" class="btn-back">← Voltar</a>
                    <h1>Nova Instância</h1>
                    <p>Configure a identidade da sua plataforma.</p>
                </div>

                <form id="platform-form" data-mode="create">
                    <div class="control-group">
                        <label>Nome da Marca</label>
                        <input type="text" id="p-name" placeholder="Ex: Rocket Academy" autocomplete="off" required>
                    </div>

                    <div class="control-group">
                        <label>URL Customizada</label>
                        <div class="input-with-prefix">
                            <span>aura.app/</span>
                            <input type="text" id="p-slug" placeholder="minha-escola" required>
                        </div>
                    </div>

                    <div class="control-group">
                        <label>Cor Identidade</label>
                        <div class="color-picker-wrapper">
                            <input type="color" id="p-color" value="#3B82F6">
                            <code id="color-hex">#3B82F6</code>
                        </div>
                    </div>

                    <div class="creator-actions">
                        <button type="submit" class="btn-launch">
                            <span>Lançar Plataforma</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </button>
                    </div>
                </form>
            </aside>

            <!-- COLUNA DE PREVIEW (O PALCO) -->
            <section class="creator-stage">
                <div class="stage-nav">
                    <button class="stage-tab active" data-view="landing">Landing Page</button>
                    <button class="stage-tab" data-view="app">Plataforma</button>
                </div>

                <div class="preview-window">
                    <div class="window-header">
                        <div class="window-dots"><span></span><span></span><span></span></div>
                        <div class="window-address" id="preview-url">aura.app/preview</div>
                    </div>
                    
                    <div class="window-content" id="preview-frame">
                        <!-- O conteúdo do preview é injetado via JS (Landing ou App) -->
                        <div class="preview-landing">
                            <nav class="p-nav">
                                <div class="p-logo">❖ <span id="view-brand-name">Marca</span></div>
                                <div class="p-btn" style="background: var(--p-color)">Acessar</div>
                            </nav>
                            <div class="p-hero">
                                <h2 id="view-hero-title">Sua plataforma de ensino.</h2>
                                <p>Aprenda com os melhores profissionais do mercado em uma experiência imersiva.</p>
                                <div class="p-cta" style="background: var(--p-color)">Começar Agora</div>
                            </div>
                            <div class="p-cards">
                                <div class="p-card"></div>
                                <div class="p-card"></div>
                                <div class="p-card"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}