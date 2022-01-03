// https://github.com/BrunoMCarnauba/blinghooptools-frontend/blob/master/src/providers/BlingAPI.ts

import axios from 'axios';

console.log('process.env.REACT_APP_PROXY_URL', process.env.REACT_APP_PROXY_URL);

axios.defaults.baseURL = (process.env.REACT_APP_PROXY_URL || '') + 'https://bling.com.br/Api/v2';
axios.defaults.timeout = 5000;

const api = axios.create();

export default api;
