import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state() {
        return {
            user: null,
            isAuthenticated: false,
            isLoggedIn: false,
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isAuthenticated = !!user;
        },
        clearUser(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
        setLoginStatus(state, status) {
            state.isLoggedIn = status;
        },
    },
    actions: {
        async login({ commit }) {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('/api/user', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    const user = response.data.user;
                    localStorage.setItem('userId', user.id); // Store the user ID
                    commit('setUser', user);
                } catch (error) {
                    console.error('Login failed:', error);
                    commit('clearUser');
                }
            }
            commit('setLoginStatus', true);
        },
        async checkAuthentication({ commit }) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            if (token && userId) {
                try {
                    const response = await axios.get(`/api/user/${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });
                    commit('setUser', response.data.user);
                } catch (error) {
                    console.error('Failed to verify token:', error);
                    commit('clearUser');
                }
            } else {
                commit('clearUser');
            }
            commit('setLoginStatus', false);
        },
        async logout({ commit }) {
            try {
                // Optionally, you could call an API to handle server-side logout
                localStorage.removeItem('token');
                localStorage.removeItem('userId'); // Remove the user ID
                commit('clearUser');
            } catch (error) {
                console.error('Logout failed:', error);
                // Handle error (e.g., show error message to the user)
            }
        },
    },
});

export default store;
