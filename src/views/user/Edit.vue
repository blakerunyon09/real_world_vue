<template>
  <div v-if="user">
    <h1>Edit User Here.</h1>
  </div>
</template>

<script>

export default {
  props: ['user'],
  data() {
    return {
      unsavedChanges: true,
    };
  },
  beforeRouteLeave(routeTo, routeFrom, next) {
    if (this.unsavedChanges) {
      // eslint-disable-next-line no-alert
      const userWantsExit = window.confirm('You have unsaved changes. Would you like to leave?');

      if (userWantsExit) next();
      else next(false);
    } else { next(); }
  },
};

</script>
