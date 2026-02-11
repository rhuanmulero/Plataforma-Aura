const defaultState = {
    platforms: [
        { id: '1', name: 'Rocket Academy', slug: 'rocket-academy', primaryColor: '#8257e5', active: true },
        { id: '2', name: 'Design Masterclass', slug: 'design-master', primaryColor: '#ec4899', active: true }
    ]
};

let state = JSON.parse(localStorage.getItem('aura_data')) || defaultState;

export const store = {
    get() { return state; },

    // Ler uma específica (para edição)
    getOne(id) {
        return state.platforms.find(p => p.id == id);
    },
    
    // CREATE
    addPlatform(platform) {
        state.platforms.push({
            id: Date.now().toString(), // ID simples via timestamp
            active: true,
            ...platform
        });
        this.save();
    },

    // UPDATE
    updatePlatform(id, updatedData) {
        const index = state.platforms.findIndex(p => p.id == id);
        if (index !== -1) {
            state.platforms[index] = { ...state.platforms[index], ...updatedData };
            this.save();
        }
    },

    // DELETE
    deletePlatform(id) {
        state.platforms = state.platforms.filter(p => p.id != id);
        this.save();
    },

    save() {
        localStorage.setItem('aura_data', JSON.stringify(state));
    }
};