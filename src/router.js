import Vue from 'vue';
import Router from 'vue-router';
import AdminPanel from './views/AdminPanel.vue';
import Login from './components/Login.vue';
import { store } from './store';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
          if (!store.getters.isAuthenticated) {
            next();
            return;
          }
          next('/')
      }
    },
    {
      path: '/',
      name: 'adminPage',
      component: AdminPanel,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next(false);
        }
      },
    }
  ],
});
