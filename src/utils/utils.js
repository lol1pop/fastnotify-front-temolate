import axios from 'axios';
import { store } from '../store';
import router from '../router';

const updateTime = 1000 * 60 * 60 * 24; // 24h


const checkIfExpired = () => {
  const expireTime = localStorage.tokenExpire;
  if (expireTime && !(Date.now() - expireTime < updateTime)) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpire');
    store.dispatch('Logout').then(() => {
      router.push("/");
    });
  }
  return localStorage.token || undefined;
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

const formParams = (params) => Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

export {
  formParams,
  setInterceptor,
  checkIfExpired,
};
