import Vue from 'vue';
import Router from 'vue-router';
//import AdminPanel from './views/AdminPanel.vue';
import HelloWorld from "@/components/HelloWorld"
import Login from './components/Login.vue';
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
      name: 'adminPage',
      component: HelloWorld,
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
