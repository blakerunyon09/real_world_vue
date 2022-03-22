<template>
  <div v-if="user">
    <h1>Follow User Here.</h1>
    <button @click="register" >Follow User</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['user'],
  methods: {
    ...mapActions([
      'setFlashMessage',
      'clearFlashMessage',
    ]),
    register() {
      const APIPromise = new Promise((res, rej) => {
        try {
          setTimeout(() => {
            res('You got it.');
          }, 300);
        } catch {
          rej(new Error('Fail'));
        }
      });

      APIPromise
        .then(() => {
          this.setFlashMessage(`You have successfully followed ${this.user.name}`);

          setTimeout(() => {
            this.clearFlashMessage();
          }, 3000);

          this.$router.push({
            name: 'Details',
          });
        });
    },
  },
};

</script>
