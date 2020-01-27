import Vue from 'vue';
import Router from 'vue-router';
import Home from "@/views/Home"
import Login from './views/Login.vue';
import { store } from './store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
          if (store.getters.isAuthenticated) {
            next('/');
          }
        next();
      }
    },
    {
      path: '/',
      name: 'AdminPage',
      component: Home,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next('/login');
        }
      },
    }
  ],
});
