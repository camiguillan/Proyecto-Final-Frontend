import axios from 'axios';

const BACKEND_URL = 'http://localhost:8081/';

export const post = (url, data, options) => axios.post(BACKEND_URL + url, data, options)
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });
export const patch = (url, data, options) => axios.patch(BACKEND_URL + url, data, options)
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });

export const get = (url, data) => axios.get(BACKEND_URL + url, data)
  .then((response) => response.data)
  .catch((error) => {
    throw error;
  });

export const fetchImage = async (id) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const response = await axios.get(`${BACKEND_URL}image/${id}`, { responseType: 'blob' });
    const imageUrl1 = response.data;
    return imageUrl1;
  } catch (error) {
    return 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmllbGR8ZW58MHx8MHx8fDA%3D&w=1000&q=80';
  }
};
