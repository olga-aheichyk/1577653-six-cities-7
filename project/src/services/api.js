import axios from 'axios';

import { BACKEND_URL } from '../consts.js';

const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
};

const token = localStorage.getItem('token') ?? '';

export const createApi = (onNotAuthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
    headers: {
      'x-token': token,
    },
  });

  const onSuccess = (response) => response;

  const onError = (err) => {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onNotAuthorized();
    }

    throw err;
  };

  const onRequest = (config) => {
    config.headers['x-token'] = localStorage.getItem('token');

    return config;
  };

  api.interceptors.response.use(onSuccess, onError);
  api.interceptors.request.use(onRequest);

  return api;
};
