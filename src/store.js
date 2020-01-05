import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import { setInterceptor } from "./utils/utils";

const expireTime = localStorage.tokenExpire;
if (expireTime && !(Date.now() - expireTime < 1000 * 60 * 60 * 24)) {
  localStorage.removeItem("token");
  localStorage.removeItem("tokenExpire");
  localStorage.removeItem("authData");
}

const storedToken = localStorage.token || false;
const storedAuthData = localStorage.authData || false;
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    authToken: storedToken || null,
    authData: storedAuthData || null
  },
  mutations: {
    setAuthToken: (state, { token }) => {
      state.authToken = token;
    },
    setAuthData: (state, { data }) => {
      state.authData = data;
    }
  },
  actions: {
    Logout ({ commit }) {
      commit("setAuthToken", { token: null });
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpire");
    },
    AuthByToken({commit}, credentials) {
      return axios.post('/api/login', {
        email: credentials.email,
        password: credentials.password
      }).then(res => {
        const token = res.data.token;
        commit("setAuthToken", {token});
        setInterceptor();
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpire", Date.now());
      }).catch(err => {
        commit("setAuthToken", {token: null});
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpire");
        throw err;
      });
    },
    AuthWithPolicy({commit}, { email, password }) {
      return axios.post('/api/login', {
        login: email,
        password: password
      }).then(res => {
        commit("setAuthData", { data: res.data });
        setInterceptor();
        localStorage.setItem("authData", res.data );
        localStorage.setItem("tokenExpire", Date.now());
      }).catch(err => {
        commit("setAuthData", { data: null });
        localStorage.removeItem("authData");
        localStorage.removeItem("tokenExpire");
        throw err;
      });
    }
  },
  getters: {
    isAuthenticated: state => !!state.authToken
  }
});
