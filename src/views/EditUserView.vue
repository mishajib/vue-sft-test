<template>
  <v-card width="600" class="mx-auto mt-5">
    <v-card-title>
      <h3 class="display-1">Edit User</h3>
    </v-card-title>
    <v-form @submit.prevent="updateHandler">
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
            label="Password (Optional)"/>

        <v-text-field
            v-model="data.password_confirmation"
            type="password"
            label="Password Confirm (Optional)"/>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="success" to="/users">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="info" type="submit">Update</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup>
import {reactive, onMounted, inject} from "vue";
import {useRouter} from "vue-router";
import axios from "axios";

const props = defineProps(['id']);

const toast = inject('toast');

const {id}   = props;
const router = useRouter();
const data   = reactive({
  name                 : "",
  email                : "",
  birth_date           : "",
  password             : "",
  password_confirmation: ""
});

const getUser = () => {
  axios.get('http://lr-softzino-test.lcl/api/users/' + id)
      .then(res => {
        data.name       = res.data.user.name;
        data.email      = res.data.user.email;
        data.birth_date = res.data.user.birth_date;

      })
      .catch(err => {
        toast.error(err?.response?.data?.message);
      });
};

const updateHandler = () => {
  axios.put('http://lr-softzino-test.lcl/api/users/' + id, data)
      .then(res => {
        data.name       = res.data.user.name;
        data.email      = res.data.user.email;
        data.birth_date = res.data.user.birth_date;
        toast.success(res.data.message);
      })
      .catch(err => {
        if (err.response?.data?.hasOwnProperty('errors')) {
          for (let error in err.response.data.errors) {
            toast.error(err.response.data.errors[error][0]);
          }
        } else {

          toast.error(err?.response?.data?.message);
        }
      });
};

onMounted(() => {
  getUser();
});
</script>