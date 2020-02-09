import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import { setInterceptor } from "./utils/utils";


const storedToken = localStorage.accessToken || false;
const expireTime = localStorage.accessTokenExpire;
if (expireTime && !(Date.now() - expireTime < 1000 * 60 * 60 * 24)) {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("accessTokenExpire");
}
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    authToken: storedToken || null
  },
  mutations: {
    setAuthToken: (state, { token }) => {
      state.authToken = token;
    }
  },
  actions: {
    logout ({ commit }) {
      commit("setAuthToken", { token: null });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("accessTokenExpire");
    },
    authByToken({commit}, credentials) {
      return axios.post('/api/auth', {
        login: credentials.login,
        password: credentials.password
      }).then(res => {
        const token = res.data['access_token'];
        commit("setAuthToken", { token });
        setInterceptor();
        localStorage.setItem("accessToken", token);
        localStorage.setItem("accessTokenExpire", Date.now());
      }).catch(err => {
        commit("setAuthToken", { token: null });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("accessTokenExpire");
        throw err;
      });
    }
  },
  getters: {
    isAuthenticatedToken: state => !!state.authToken
  }
});
