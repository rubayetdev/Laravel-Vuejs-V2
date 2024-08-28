import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/componentFile/loginComponenet.vue';
import Register from '../components/componentFile/registerComponenet.vue';
import Dashboard from '../components/componentFile/dashboard.vue';

// Define routes as an array of route objects
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard/:id',
        name: 'Dashboard',
        component: Dashboard,
        props:true
    }
];

// Create the router instance with the configuration
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
