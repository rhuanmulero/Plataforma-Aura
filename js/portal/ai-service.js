// js/portal/ai-service.js
export const AIService = {
    // 1. ESTRUTURA
    async generateCourseStructure(topic, audience, apiKey) {
        const prompt = `
            Atue como um Especialista em Design Instrucional.
            Crie a estrutura JSON para um curso sobre "${topic}".
            Público: ${audience}.
            O curso deve ser estruturado com 1 módulo.
            Retorne APENAS JSON válido (sem markdown) seguindo este schema:
            {
                "title": "Nome do Curso",
                "description": "Descrição curta",
                "modules": [
                    { "title": "Nome do Módulo", "lessons": [ { "title": "Nome da Aula" } ] }
                ]
            }
        `;
        return await this.callGemini(prompt, apiKey, true);
    },

    // 2. CONTEÚDO STREAMING (Simplificado para o exemplo)
    async streamLessonContent(lessonTitle, courseTitle, apiKey, onUpdate) {
        return "Conteúdo gerado..."; 
    },

    // CORE CALLER
    async callGemini(promptText, apiKey, expectJson) {
        if (!apiKey) throw new Error("API Key não informada");
        
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
            const resp = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
            });
            
            const data = await resp.json();
            if(data.error) throw new Error(data.error.message);
            
            let text = data.candidates[0].content.parts[0].text;
            if (expectJson) {
                text = text.replace(/```json/g, '').replace(/```/g, '').trim();
                return JSON.parse(text);
            }
            return text;
        } catch (e) {
            console.error("AI Error:", e);
            throw e;
        }
    }
};