// https://github.com/BrunoMCarnauba/blinghooptools-frontend/blob/master/src/providers/BlingAPI.ts

import axios from 'axios';

const baseURL =
  (process.env.REACT_APP_PROXY_URL || 'http://localhost:3001/') + 'https://bling.com.br/Api/v2';

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 10000;

const api = axios.create();

export default api;
