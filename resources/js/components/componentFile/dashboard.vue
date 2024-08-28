<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 class="text-3xl font-bold mb-6">Dashboard</h2>
        <!-- Use v-if to ensure user data is loaded before accessing it -->
        <p v-if="user">Welcome, <strong>{{ user.name }}</strong>!  User ID: <strong>{{ id }}</strong>
            Email: <strong>{{user.email}}</strong>
        </p>
        <p v-else-if="loading">Loading user data...</p>
        <p v-else>Error loading user data. Please try again later.</p>
        <button
            @click="logout"
            class="bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
            Logout
        </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id'],
    data() {
        return {
            user: null,
            loading: true
        };
    },
    async created() {
        try {
            const response = await axios.get(`/api/user/${this.id}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
            this.user = response.data.user;
        } catch (error) {
            console.error('Failed to fetch user data:', error.response ? error.response.data : error.message);
        }
    },
    methods: {
        async logout() {
            try {
                await axios.post('/api/logout', {}, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    }
                });
                localStorage.removeItem('token');
                this.$router.push('/');
            } catch (error) {
                console.error('Logout error:', error.response ? error.response.data : error.message);
            }
        },
    },
};
</script>
