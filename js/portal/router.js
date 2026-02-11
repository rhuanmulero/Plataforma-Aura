
import { dashboardView } from './views/dashboard.js';
import { createView } from './views/create.js';
import { publicView } from './views/public.js'; 
import { manageView } from './views/manage.js';

export const router = {
    match(hash) {
        if (!hash || hash === '#/') return dashboardView();
    
        if (hash === '#/create') return createView();
        
        if (hash.startsWith('#/edit/')) {
            return createView(); 
        }

        if (hash.startsWith('#/view/')) {
            const slug = hash.replace('#/view/', '');
            return publicView(slug);
        }

        if (hash.startsWith('#/manage/')) {
            const id = hash.split('/')[2];
            return manageView(id);
        }

        return '<div style="color:white; padding:50px;">404 - Página não encontrada</div>';
    }
};