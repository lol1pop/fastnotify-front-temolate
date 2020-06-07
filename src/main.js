import './axios.init.js'
import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import { router } from "./router"
import vuetify from './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'
//import 'babel-polyfill'
import Clipboard from "vue-clipboard2"

Vue.use(Clipboard);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
