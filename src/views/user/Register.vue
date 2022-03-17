<template>
  <div v-if="user">
    <h1>Follow User Here.</h1>
    <button @click="register" >Follow User</button>
  </div>
</template>

<script>

export default {
  props: ['user'],
  inject: ['GlobalStore'],
  methods: {
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
          this.GlobalStore.flashMessage = `You have successfully followed ${this.user.name}`;

          setTimeout(() => {
            this.GlobalStore.flashMessage = '';
          }, 3000);

          this.$router.push({
            name: 'Details',
          });
        });
    },
  },
};

</script>
