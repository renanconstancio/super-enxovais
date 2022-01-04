// https://github.com/BrunoMCarnauba/blinghooptools-frontend/blob/master/src/providers/BlingAPI.ts

import axios from 'axios';

// console.log('process.env.REACT_APP_PROXY_URL', process.env.REACT_APP_PROXY_URL);
// console.log('process.env.HOST', process.env.HOST);

axios.defaults.baseURL =
  (process.env.REACT_APP_PROXY_URL || 'https://cors.dcisuporte.com.br/') +
  'https://bling.com.br/Api/v2';
// axios.defaults.baseURL = 'https://cors.dcisuporte.com.br/' + 'https://bling.com.br/Api/v2';
axios.defaults.timeout = 5000;

const api = axios.create();

export default api;
