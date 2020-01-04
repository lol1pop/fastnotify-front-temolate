import Vue from 'vue';
import Router from 'vue-router';
import Configs from './views/Configs.vue';
import Login from './views/login.vue';
import store from './store';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/configs',
      name: 'configs',
      component: Configs,
      props: { isLoadingRawData: false },
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: '/configs/raw',
      name: 'rawConfigs',
      component: Configs,
      props: { isLoadingRawData: true },
      beforeEnter: (to, from, next) => {
        if (store.state.token) {
          next();
        } else {
          next(false);
        }
      },
    },
  ],
});
