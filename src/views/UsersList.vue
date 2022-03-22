<template>
  <div
    class="users"
    v-if="users"
  >
    <UserCard
      v-for="user in usersOnPage"
      :user="user"
      :key="user.id"
    />
  </div>
  <div>
    <router-link
      :to="{ name: 'UsersList', query: { page: page - 1 } }"
      rel="prev"
      v-if="page != 1"
    >
      Prev Page
    </router-link>
    <router-link
      :to="{ name: 'UsersList', query: { page: page + 1 } }"
      rel="next"
      v-if="hasNextPage"
      >
      Next Page
    </router-link>
  </div>
</template>

<script>
import UserCard from '@/components/UserCard.vue';
import NProgress from 'nprogress';
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'UsersList',
  components: {
    UserCard,
  },
  props: ['page'],
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
    ...mapGetters([
      'getUsersByPage',
      'checkNextPage',
    ]),
    usersOnPage() {
      return this.getUsersByPage(this.page);
    },
    hasNextPage() {
      return this.checkNextPage(this.page);
    },
  },
  create() {
    NProgress.start();
    setTimeout(() => {
      NProgress.end();
    }, 1000);
  },
};
</script>

<style scoped>
  .users {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
</style>

// beforeRoute Examples

// beforeRouteEnter(routeTo, routeFrom, next) {
//   NProgress.start();
//   return JsonApiService.getUsers(2, parseInt(routeTo.query.page, 10) || 1)
//     .then((response) => {
//       next((comp) => {
//         comp.users = response.data;
//         comp.totalUsers = response.headers['x-total-count'];
//       });
//     })
//     .catch((err) => console.log(err))
//     .finally(() => NProgress.done());
// },

// beforeRouteUpdate(routeTo) {
//   NProgress.start();
//   JsonApiService.getUsers(2, parseInt(routeTo.query.page, 10) || 1)
//     .then((response) => {
//       this.users = response.data;
//       this.totalUsers = response.headers['x-total-count'];
//     })
//     .catch((err) => console.log(err))
//     .finally(() => NProgress.done());
// }
