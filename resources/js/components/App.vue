<template>
    <div>
        <nav-bar></nav-bar>
        <router-view></router-view> <!-- Displays the routed components -->
        <footer-bar></footer-bar>
    </div>
</template>

<script>
import store from '../store/index.js';
import NavBar from './componentFile/navComponent.vue'; // Ensure correct import
import FooterBar from './componentFile/footerComponent.vue'; // Ensure correct import

export default {
    components: {
        NavBar,
        FooterBar
    },
    created() {
        store.dispatch('checkAuthentication'); // Optional initial check
    },
};
</script>

<style scoped>
/* Add your styles here */
</style>
