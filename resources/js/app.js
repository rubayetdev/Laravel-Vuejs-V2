import { createApp } from 'vue';
import App from '../js/components/App.vue'; // Import your root component
import router from '../js/router/index.js'; // Import the router configuration
import axios from 'axios';
import store from "../js/store/index.js";

const app = createApp(App);
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

app.use(router);
app.use(store);
// Mount the app
app.mount('#app');
