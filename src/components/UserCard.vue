<template>
  <router-link class="user-link" :to="{ name: 'Details', params: { id: user.id }}">
    <div class="user-card">
      <span class="user-card-text">{{user.name}}</span>
      <h4>{{user.email}}</h4>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: Object,
  },
};
</script>

<style scoped>
  .user-card {
    width: 300px;
    border: 1px black solid;
    cursor: pointer;
    transform: scale(1);
    transition: transform 0.15s;
  }

  .user-card:hover {
    transform: scale(1.015);
  }

  .user-link {
    text-decoration: none;
    color: #2c3e50;
  }
</style>
