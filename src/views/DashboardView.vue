<template>
  <v-row class="justify-center mt-5">
    <v-col cols="6">
      <v-card>
        <v-card-title>
          User Information
        </v-card-title>
        <v-card-text>
          <p>Name: {{ user.name }}</p>
          <p>Email: {{ user.email }}</p>
          <p>Birth Date: {{ $filters.birthdate_format(user.birth_date) }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: 'DashboardView',
  data: () => ({
    user: {},
  }),
  mounted() {
    this.user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  },
}
</script>