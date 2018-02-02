import axios from 'axios';

axios.defaults.baseURL = '';
axios.defaults.timeout = 10000;

export const open = (method, url, body, token) => {
  let headers = {
    'Content-type': 'application/json',
  };

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    };
  }

  return axios({
    url,
    method,
    data: body !== undefined ? body : null,
    headers,
  });
};

export default open;