<template>
  <div v-if="user">
    <h1>{{ user.name }}</h1>
    <p>{{ user.username }}</p>
    <p>{{ user.email }}</p>
  </div>
</template>

<script>

export default {
  props: ['user'],
};

</script>
