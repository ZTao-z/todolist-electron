import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
});

instance.interceptors.request.use(config => {
  return config;
}, err => {
  return err;
});

instance.interceptors.response.use(response => {
  return response.data;
}, err => {
  return err;
});

export default instance;