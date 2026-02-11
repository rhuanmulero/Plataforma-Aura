import { dashboardView } from './views/dashboard.js';
import { createView } from './views/create.js';

const routes = {
    '/': dashboardView,
    '/create': createView
};

export const router = {
    match(hash) {
        const path = hash.replace('#', '') || '/';
        const viewFn = routes[path];
        
        return viewFn ? viewFn() : '<h1>404 - Página não encontrada</h1>';
    }
};