import axios from 'axios';

const BACKEND_URL = 'http://localhost:8081/';

export const post = (url, data, options) => axios.post(BACKEND_URL + url, data, options)
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });

export const get = (url, data) => axios.get(BACKEND_URL + url, { data })
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
