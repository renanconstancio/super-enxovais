import axios from 'axios';

console.log('process.env.PORT', process.env.PORT);

// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// eslint-disable-next-line no-undef
// axios.defaults.baseURL = process.env.REACT_APP_URI_API;
// axios.defaults.baseURL = `http://localhost:${process.env.PORT || 3000}`;
// axios.defaults.baseURL = `https://bling.com.br/Api/v2`;
axios.defaults.timeout = 5000;

const api = axios.create();

export default api;
