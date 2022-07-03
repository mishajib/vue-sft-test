import {defineStore} from 'pinia';
import axios from 'axios';
import {inject} from "vue";

const toast = inject('toast');

export const useAuthStore = defineStore('authentication', {
    state  : () => ({
        user : null,
        token: null,
    }),
    getters: {
        isAuthenticated: state => !!state.user,
    },
    actions: {
        register(data) {
            return new Promise((resolve, reject) => {
                return axios.post('http://lr-softzino-test.lcl/api/register', data)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        login(data) {
            return new Promise((resolve, reject) => {
                return axios.post('http://lr-softzino-test.lcl/api/login', data)
                    .then(res => {
                        this.user  = res.data.user;
                        this.token = res.data.token;
                        localStorage.setItem('user', JSON.stringify(res.data.user));
                        localStorage.setItem('token', JSON.stringify(res.data.token));
                        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                        resolve(res);
                    })
                    .catch(err => {
                        this.user = null;
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        axios.defaults.headers.common['Authorization'] = null;
                        reject(err);
                    });
            });
        },
        logout() {
            return new Promise((resolve, reject) => {
                axios.post('http://lr-softzino-test.lcl/api/logout')
                    .then(res => {
                        this.user  = null;
                        this.token = null;
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        axios.defaults.headers.common['Authorization'] = null;
                        resolve(res);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        },
        user() {
            return new Promise((resolve, reject) => {
                axios.get('http://lr-softzino-test.lcl/api/user')
                    .then(res => {
                        console.log(res);
                        this.user = res.data.user;
                        resolve(res);
                    })
                    .catch(err => {
                        this.user = null;
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        axios.defaults.headers.common['Authorization'] = null;
                        console.log(err.response);
                        reject(err);
                    });
            });
        },
    }
});
