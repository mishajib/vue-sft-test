import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import axios from "axios";
import {parseJwtToken} from "@/helpers";

const routes = [
    {
        path     : '/',
        name     : 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
        }
    },

    {
        path: '/register',
        name: 'register',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
        },
        meta     : {
            guest: true,
        }
    },

    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
        },
        meta     : {
            guest: true,
        }
    },

    {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
        },
        meta     : {
            requiresAuth: true
        }
    },

    {
        path: '/users',
        name: 'users',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "users" */ '../views/UsersView.vue')
        },
        meta     : {
            requiresAuth: true
        }
    },

    {
        path: '/users/create',
        name: 'user.create',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "user-create" */ '../views/CreateUserView.vue')
        },
        meta     : {
            requiresAuth: true
        }
    },

    {
        path: '/users/:id/edit',
        name: 'user.edit',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "user-edit" */ '../views/EditUserView.vue')
        },
        meta     : {
            requiresAuth: true
        },
        props    : true,
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (token) {
        let TokenDetails     = parseJwtToken(token);
        let tokenExpiredAt   = TokenDetails.exp;
        let CurrentTimestamp = parseInt(Date.now()) / 1000;
        if (tokenExpiredAt < CurrentTimestamp) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
        }
    }


    const isAuthenticated = !!localStorage.getItem('user');
    // If route is restricted and user is not authenticated
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        next('/login');
    }

    // If route is not restricted and user is authenticated
    if (to.matched.some(record => record.meta.guest) && isAuthenticated) {
        next('/dashboard');
    }

    // If route is not restricted and user is not authenticated
    next();
})

export default router
