import { createRouter, createWebHistory } from 'vue-router';
import nprogress from 'nprogress';
import UsersList from '../views/UsersList.vue';
import About from '../views/About.vue';
import RegisterUser from '../views/RegisterUser.vue';
import Layout from '../views/user/Layout.vue';
import Details from '../views/user/Details.vue';
import Register from '../views/user/Register.vue';
import Edit from '../views/user/Edit.vue';
import NotFound from '../views/NotFound.vue';
import store from '../store/index';

const routes = [
  {
    path: '/',
    name: 'UsersList',
    component: UsersList,
    props: (route) => ({ page: parseInt(route.query.page, 10) || 1 }),
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/register',
    name: 'RegisterUser',
    component: RegisterUser,
  },
  {
    path: '/user/:id',
    name: 'Layout',
    props: true,
    component: Layout,
    beforeEnter: (to) => store.dispatch('setUser', to.params.id)
      .catch(() => ({
        name: '404Resource',
        params: { resource: 'user' },
      })),
    children: [
      {
        path: '',
        name: 'Details',
        component: Details,
      },
      {
        path: 'register',
        name: 'Register',
        component: Register,
      },
      {
        path: 'edit',
        name: 'Edit',
        component: Edit,
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  nprogress.start();
});

router.afterEach(() => {
  nprogress.done();
});

export default router;
