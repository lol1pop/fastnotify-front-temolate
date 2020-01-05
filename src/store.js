import Vuex from "vuex";
import Vue from "vue";
import apiLogin from "./api/login/apiLogin";
import { setInterceptor } from "./utils/utils";

const expireTime = localStorage.tokenExpire;
if (expireTime && !(Date.now() - expireTime < 1000 * 60 * 60 * 24)) {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpire");
}

const storedToken = localStorage.token || false;
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
    Logout: ({ commit }) => {
      commit("setAuthToken", { token: null });
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpire");
    },
    Auth: ({ commit }, credentials) => {
        return apiLogin
          .auth(credentials)
          .then(res => {
            const token = res.data.token;
            commit("setAuthToken", { token });
            setInterceptor();
            localStorage.token = token;
            localStorage.tokenExpire = Date.now();
          })
          .catch(err => {
            commit("setAuthToken", { token: null });
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpire");
            throw err;
          });
      }
  },
  getters: {
    isAuthenticated: state => !!state.authToken
  }
});
