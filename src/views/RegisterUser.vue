<template>
  <h1>Register A User</h1>
  <form @submit.prevent="handleSubmit">
    <label
        for="name"
    >
        Name
    </label>
    <input
        v-model="userModel.name"
        type="text"
        id="name"
        placeholder="Name"
    >
    <label
        for="username"
    >
        Username
    </label>
    <input
        v-model="userModel.username"
        type="text"
        id="username"
        placeholder="Username"
    >
    <label
        for="email"
    >
        Email
    </label>
    <input
        v-model="userModel.email"
        type="text"
        id="email"
        placeholder="Email"
    >
    <button
        type="submit"
    >
        Submit
    </button>
  </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import JsonApiService from '../services/JsonApiService';

export default {
  data() {
    return {
      userModel: {
        id: null,
        name: null,
        username: null,
        email: null,
      },
    };
  },
  methods: {
    handleSubmit() {
      const newUser = {
        ...this.userModel,
        id: uuidv4(),
      };
      JsonApiService.postUser(newUser)
        .then(() => {
          this.$router.push({ name: 'Details', params: { id: newUser.id } });
        });
    },
  },
};

</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;
    width: 200px;
    margin: auto;
    font-weight: bold;
}

button {
    align-self: center;
    margin-top: 10px;
    width: 100px;
}

</style>
