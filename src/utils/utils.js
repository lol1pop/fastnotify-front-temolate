import axios from 'axios';
import { store } from '../store';
import { router } from "../router"

const updateTime = 1000 * 60 * 60 * 24; // 24h


const checkIfExpired = () => {
  const expireTime = localStorage.accessTokenExpire;
  if (expireTime && !(Date.now() - expireTime < updateTime) && !!localStorage.accessToken) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpire');
    store.dispatch('logout').then(() => {
      router.push("/");
    });
  }
  return localStorage.accessToken;
};

const setInterceptor = () => {
  const createSetAuthInterceptor = (token) => (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  };

  const setAuth = createSetAuthInterceptor(checkIfExpired() || store.state.authToken);
  axios.interceptors.request.use(setAuth);
};

// Vue.prototype.$http = Axios;
// const token = localStorage.getItem('token')
// if (token) {
//   Vue.prototype.$http.defaults.headers.common['Authorization'] = token
// }

const formParams = (params) => Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

export {
  formParams,
  setInterceptor,
  checkIfExpired,
};
