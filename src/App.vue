<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-btn to="/" class="float-start">
          Softzino Test
        </v-btn>
      </v-app-bar-title>
      <v-btn-group class="float-end">
        <template v-if="!isAuthenticated">
          <v-btn to="/register">Register</v-btn>
          <v-btn to="/login">Login</v-btn>
        </template>
        <template v-else>
          <v-btn :to="{ name: 'users' }">Users</v-btn>
          <v-btn :to="{ name: 'dashboard' }">Dashboard</v-btn>
          <v-btn @click.prevent="logoutHandler">Logout</v-btn>
        </template>
      </v-btn-group>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import {inject} from "vue";
import {useAuthStore} from "@/store";
import {useRouter} from "vue-router";

const router          = useRouter();
const toast           = inject("toast");
const isAuthenticated = !!localStorage.getItem('user');

const authUser = useAuthStore();

const logoutHandler = () => {
  authUser.logout()
      .then(res => {
        toast.success(res.data.message);
        router.push('/login');
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
};
</script>
