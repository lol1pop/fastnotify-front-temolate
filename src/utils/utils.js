import axios from 'axios';
import store from '../store';
import { logglyApi, authToken } from '../constants/const';

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

const loadData = ({ id }) => {
  return fetch(logglyApi.replace('%ID%', id), {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => response.json())
    .catch(() => 'Loading error');
};

export {
  loadData,
  formParams,
  setInterceptor,
  checkIfExpired,
};
