<template>
  <v-card>
    <v-card-title>
      All Users
      <v-btn class="float-end" color="primary" to="/users/create">Add User</v-btn>
    </v-card-title>
    <v-card-text>
      <v-table
          fixed-header
          height="300px">
        <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            Birthdate
          </th>
          <th class="text-left">
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in data.users" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ $filters.birthdate_format(item.birth_date) }}</td>
          <td>
            <v-btn-group>
              <v-btn size="small"
                     color="primary"
                     :to="{ name: 'user.edit', params: { id: item.id } }">
                Edit
              </v-btn>
              <v-btn size="small" @click.prevent="deleteUser(item.id)"
                     color="error">
                Delete
              </v-btn>
            </v-btn-group>
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {reactive, onMounted, inject} from "vue";
import axios from "axios";

const toast = inject('toast');

const data = reactive({
  users: [],
});

const getUsers = () => {
  axios.get('http://lr-softzino-test.lcl/api/users')
      .then(res => {
        data.users = res.data.users;
      })
      .catch(err => {
        console.log(err.response);
      });
};

const deleteUser = (id) => {
  axios.delete('http://lr-softzino-test.lcl/api/users/' + id)
      .then(res => {
        toast.success(res.data.message);
        getUsers();
      })
      .catch(err => {
        toast.error(err?.response?.data?.message);
      });
};

onMounted(() => {
  getUsers();
});
</script>