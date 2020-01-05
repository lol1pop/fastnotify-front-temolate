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
    status: undefined,
    token: storedToken || null,
    isLoading: false,
    isError: false
  },
  mutations: {
    authPending: state => {
      state.status = "loading";
      state.isLoading = true;
      state.isError = false;
    },
    authReject: state => {
      state.status = "error";
      state.isLoading = false;
      state.isError = true;
      state.token = null;
    },
    authSuccess: (state, token) => {
      state.status = "success";
      state.isLoading = false;
      state.isError = false;
      state.token = token;
    },
    authLogout: state => {
        state.status = "logout";
        state.isLoading = false;
        state.isError = false;
        state.token = null;
    }
  },
  actions: {
    LOGOUT: store => {
      store.commit("authLogout");
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpire");
    },
    AUTH: ({ state, commit }, credentials) => {
      if (!state.isLoading) {
        commit("authPending", state);
        return apiLogin
          .auth(credentials)
          .then(res => {
            const token = res.data.token;
            commit("authSuccess", token);
            setInterceptor();
            localStorage.token = token;
            localStorage.tokenExpire = Date.now();
          })
          .catch(err => {
            commit("authReject", state);
            localStorage.removeItem("token");
            localStorage.removeItem("tokenExpire");
            throw err;
          });
      }
      return false;
    }
  },
  getters: {
    authStatus: state => {
      return state.status;
    },
    isAuthenticated: state => {
      return !!state.token;
    }
  }
});
