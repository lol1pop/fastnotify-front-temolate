import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import HelloWorld from "@/components/HelloWorld"
import CreateAlert from "@/components/CreateAlert"
import SendAlert from "@/components/SendAlert"
import { store } from './store';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'AdminPage',
      component: HelloWorld
    },
    {
      path: '/created-alert',
      name: 'Create Alert',
      component: CreateAlert
    },
    {
      path: "/send-alert",
      name: 'Send Alert',
      component: SendAlert
    },
    {
      path: '/Hello',
      name: 'helloWorld',
      component: HelloWorld
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  if (authRequired && !store.getters.isAuthenticatedToken) {
    return next('/login');
  }
  next()
})