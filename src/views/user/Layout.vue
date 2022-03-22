<template>
  <div v-if="user">
    <nav>
      <router-link
        class="nav-btn"
        :to="{ name: 'Details' }"
      >Details</router-link>
      |
      <router-link
        class="nav-btn"
        :to="{ name: 'Register' }"
      >Register</router-link>
      |
      <router-link
        class="nav-btn"
        :to="{ name: 'Edit' }"
      >Edit</router-link>
    </nav>
    <router-view :user="user" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
};

</script>

<style scoped>

  .nav-btn {
    padding: 5px;
    color: #2c3e50;
    font-weight: bold;
  }

</style>
