import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
    {
        path: '/',
        component: Home
    }
]

const router = createRouter({
    mode: 'history',
    history: createWebHashHistory(),
    routes
})

export default router