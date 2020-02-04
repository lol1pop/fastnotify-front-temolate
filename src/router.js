import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import HelloWorld from "@/components/HelloWorld"
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
      component: HelloWorld,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next('/login');
        }
      },
    },
    {
      path: '/Hello',
      name: 'helloWorld',
      component: HelloWorld,
      beforeEnter: (to, from, next) => {
        if (store.getters.isAuthenticated) {
          next();
        } else {
          next('/login');
        }
      }
    }
  ],
});
