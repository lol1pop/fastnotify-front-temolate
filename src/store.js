import Vuex from "vuex";
import Vue from "vue";
import axios from "axios";
import {checkIfExpired, setInterceptor} from "./utils/utils"
import VueJwtDecode from 'vue-jwt-decode'

const storedToken = localStorage.accessToken || false;
const expireTime = localStorage.accessTokenExpire;
if (expireTime && !(Date.now() - expireTime < 1000 * 60 * 60 * 24)) {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("accessTokenExpire");
}
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    authToken: storedToken || null,
    userId: null,
    listSenders: {
      user: null,
      group: null
    }
  },
  mutations: {
    setAuthToken: (state, { token }) => {
      state.authToken = token
      state.userId = parseInt(VueJwtDecode.decode(token)["unique_name"],10)
    },
    setListUserOrGroup: (state, { nameList, list }) => {
      state.listSenders[nameList] = list
    }
  },
  actions: {
    logout ({ commit }) {
      commit("setAuthToken", { token: null })
      localStorage.removeItem("accessToken")
      localStorage.removeItem("accessTokenExpire")
    },
    authByToken({commit}, credentials) {
      return axios.post("/api/auth", {
        login: credentials.login,
        password: credentials.password
      }).then(res => {
        const token = res.data["access_token"]
        commit("setAuthToken", { token })
        setInterceptor()
        //axios.defaults.headers.common['Authorization'] = token
        localStorage.setItem("accessToken", token)
        localStorage.setItem("accessTokenExpire", Date.now())
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log("STORE::authByToken::ERROR", err)
        commit("setAuthToken", { token: null })
        localStorage.removeItem("accessToken")
        localStorage.removeItem("accessTokenExpire")
        throw err
      });
    },
    getListUsers({commit}, queryParams) {
      return axios.get("/api/users" + queryParams)
        .then(res => {
          const nameList = "user"
          commit("setListUserOrGroup", { nameList, list: res.data })
        })
        .catch(err => {
          //commit(" ", err)
          // eslint-disable-next-line no-console
          console.log("STORE::LISTUSER::ERROR", err)
          throw err
        })
    },
    getListGroups({commit}, queryParams) {
      return axios.get("/api/groups" + queryParams)
        .then(res => {
          const nameList = "group"
          commit("setListUserOrGroup", { nameList, list: res.data })
        })
        .catch(err => {
          //commit(" ", err)
          // eslint-disable-next-line no-console
          console.log("STORE::LISTGROUP::ERROR", err)
          throw err
        })
    },
    checkLogged({commit}) {
      const token = checkIfExpired()
      if (token) {
        commit("setAuthToken", { token })
      }
    }
  },
  getters: {
    isAuthenticatedToken: state => !!state.authToken,
    listUsers: state => state.listSenders.user,
    listGroup: state => state.listSenders.group,
    getUserId: state => state.userId
  }
});
