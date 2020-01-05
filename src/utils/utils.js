import axios from 'axios';
import store from '../store';

const updateTime = 1000 * 60 * 60 * 24; // 24h


const checkIfExpired = () => {
  const expireTime = localStorage.tokenExpire;
  if (expireTime && !(Date.now() - expireTime < updateTime)) {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpire');
    store.dispatch('LOGOUT');
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

  const setAuth = createSetAuthInterceptor(checkIfExpired() || store.state.token);
  axios.interceptors.request.use(setAuth);
};

const formParams = (params) => Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');

export {
  formParams,
  setInterceptor,
  checkIfExpired,
};
