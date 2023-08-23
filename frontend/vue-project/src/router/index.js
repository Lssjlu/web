import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Menu',
            component: () => import('../views/Menu.vue'),
            children: [
                {
                    path: '/admin',
                    name: 'admin', component: () => import('../views/Menu.vue')
                }
            ]
        }
    ]
})

export default router
