import moment from 'moment';

export function setToken({ data }) {
  const expireDate = moment().add(data.expiresIn, 's').toISOString();
  const newData = { ...data, expireDate };
  
  return localStorage.setItem('token', JSON.stringify(newData));
}

export function getToken() {
  return JSON.parse(localStorage.getItem('token'));
}
