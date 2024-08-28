<script>
import { mapState } from 'vuex';

export default {
    computed: {
        isLoggedIn: mapState('isLoggedIn'),
    },
};
</script>


<template>
    <footer class="bg-gray-800 text-white py-4">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center">
                <p class="text-sm">&copy; 2024 MyWebsite. All rights reserved.</p>
                <div class="flex space-x-4" v-if="isLoggedIn">
                    <a href="#" class="text-gray-400 hover:text-white">Privacy Policy</a>
                    <a href="#" class="text-gray-400 hover:text-white">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>

</template>

<style scoped>

</style>
