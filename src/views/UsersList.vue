<template>
  <div class="users">
    <UserCard
      v-for="user in users"
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
/* eslint-disable no-param-reassign */
import UserCard from '@/components/UserCard.vue';
import JsonApiService from '@/services/JsonApiService';
import NProgress from 'nprogress';
import { watchEffect } from 'vue';

export default {
  name: 'UsersList',
  components: {
    UserCard,
  },
  props: ['page'],
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalUsers / 2);

      return this.page < totalPages;
    },
  },
  create() {
    NProgress.start();
    setTimeout(() => {
      NProgress.end();
    }, 1000);
  },
  // WITHOUT GLOBAL LOADING BAR
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
  // },
  // WITH GLOBAL LOADING BAR
  created() {
    this.users = null;
    watchEffect(() => JsonApiService.getUsers(2, this.page)
      .then((response) => {
        this.users = response.data;
        this.totalUsers = response.headers['x-total-count'];
      })
      .catch((err) => console.log(err)));
  },
  data() {
    return {
      users: null,
      totalUsers: null,
    };
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
