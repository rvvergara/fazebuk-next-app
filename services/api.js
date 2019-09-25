import axios from 'axios';

export const sendRequest = async (method, path, data) => {
  const baseUrl = process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:3000';

  const result = await axios[method](`${baseUrl}/${path}`, data);
  return result;
};

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
