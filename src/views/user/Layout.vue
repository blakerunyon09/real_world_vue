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
      >Follow</router-link>
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
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapActions([
      'clearUser',
    ]),
  },
  beforeUnmount() {
    this.clearUser();
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
