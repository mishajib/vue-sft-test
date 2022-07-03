<template>
  <v-card width="600" class="mx-auto mt-5">
    <v-card-title>
      <h3 class="display-1">Registration</h3>
    </v-card-title>
    <v-form @submit.prevent="registerHandler">
      <v-card-text>
        <v-text-field
            v-model="data.name"
            label="Name"/>
        <v-text-field
            v-model="data.email"
            label="Email"/>
        <v-text-field
            v-model="data.birth_date"
            type="date"
            label="Birth Date"/>
        <v-text-field
            v-model="data.password"
            type="password"
            label="Password"/>
        <v-text-field
            v-model="data.password_confirmation"
            type="password"
            label="Password Confirmation"/>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" to="/login">Login</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" type="submit">Register</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup>
import {inject, reactive} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";
import {useAuthStore} from "@/store";

const toast  = inject('toast');
const store  = useAuthStore();
const router = useRouter();
const data   = reactive({
  name                 : "",
  email                : "",
  birth_date           : "",
  password             : "",
  password_confirmation: ""
});

const registerHandler = () => {
  store.register(data).then(res => {
    if (res.data.success) {
      toast.success(res.data.message);
      router.push({name: 'login'});
    }
  }).catch(err => {
    console.log(err);
    if (err.response?.data?.hasOwnProperty('errors')) {
      for (let error in err.response.data.errors) {
        toast.error(err.response.data.errors[error][0]);
      }
    } else {

      toast.error(err?.response?.data?.message);
    }
  });
};
</script>