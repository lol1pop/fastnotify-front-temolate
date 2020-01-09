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
    logout ({ commit }) {
      commit("setAuthToken", { token: null });
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpire");
    },
    authByToken({commit}, credentials) {
      return axios.post('/api/auth/login', {
        login: credentials.login,
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
    authWithPolicy({commit}, { login, password }) {
      // eslint-disable-next-line no-console
      console.log({login, password});
      return axios.post('/api/auth/login', {
        login: login,
        password: password
      }).then(res => {
        if(res.data && res.data.success) {
          commit("setAuthData", {data: res.data});
          localStorage.setItem("authData", JSON.stringify(res.data));
          localStorage.setItem("tokenExpire", Date.now());
          return res.data;
        }else {
          commit("setAuthData", { data: null });
          throw res.data.error;
        }
      }).catch(err => {
        commit("setAuthData", { data: null });
        localStorage.removeItem("authData");
        localStorage.removeItem("tokenExpire");
        throw "Incorrect credentials. " + err;
      });
    }
  },
  getters: {
    isAuthenticatedToken: state => !!state.authToken,
    isAuthenticated: state => !!state.authData
  }
});
