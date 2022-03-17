<template>
  <h1>Sorry, this {{ resource }} doesn't exist.</h1>
  <router-link :to="{ name: 'UsersList' }">Home</router-link>
</template>

<script>

export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page',
    },
  },
};

</script>
