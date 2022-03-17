import { createApp } from 'vue';
import GlobalStore from './store/index';
import App from './App.vue';
import router from './router';
import 'nprogress/nprogress.css';

createApp(App)
  .use(router)
  .provide('GlobalStore', GlobalStore)
  .mount('#app');
