// js/portal/store.js

const defaultLayout = {
    template: 'minimal',
    align: 'center',
    primaryColor: '#3B82F6'
};

const defaultState = {
    platforms: [
        { 
            id: '1', 
            name: 'Escola de Design', 
            slug: 'design-master', 
            active: true,
            config: { ...defaultLayout, primaryColor: '#8257e5', align: 'left' }
        },
        { 
            id: '2', 
            name: 'Tech Corp Training', 
            slug: 'tech-corp', 
            active: true,
            config: { ...defaultLayout, template: 'split', primaryColor: '#3B82F6', align: 'left' }
        }
    ]
};

let state = JSON.parse(localStorage.getItem('aura_data')) || defaultState;

export const store = {
    get() { return state; },

    getOne(id) {
        return state.platforms.find(p => p.id == id);
    },
    
    addPlatform(data) {
        const newPlatform = {
            id: Date.now().toString(),
            active: true,
            name: data.name,
            slug: data.slug,
            config: data.config // Salva as escolhas do Builder
        };
        state.platforms.push(newPlatform);
        this.save();
    },

    updatePlatform(id, updatedData) {
        const index = state.platforms.findIndex(p => p.id == id);
        if (index !== -1) {
            state.platforms[index] = { ...state.platforms[index], ...updatedData };
            this.save();
        }
    },

    deletePlatform(id) {
        state.platforms = state.platforms.filter(p => p.id != id);
        this.save();
    },

    save() {
        localStorage.setItem('aura_data', JSON.stringify(state));
    }
};