export const type = {
  start: 'http/START',
  startRequest: 'http/START_REQUEST',
  stopRequest: 'http/STOP_REQUEST',
};

export const startGet = (url, resolve, reject, key, params, refresh) => ({
  type: type.start,
  payload: {
    method: 'get',
    url,
    resolve,
    reject,
    key,
    params,
    refresh,
  },
});

export const startPost = (url, body, resolve, reject, key, params) => ({
  type: type.start,
  payload: {
    method: 'post',
    url,
    body,
    resolve,
    reject,
    key,
    params,
  },
});

export const startPatch = (url, body, resolve, reject, key, params) => ({
  type: type.start,
  payload: {
    method: 'patch',
    url,
    body,
    resolve,
    reject,
    key,
    params,
  },
});

export const startRequest = (id, method, url, key) => ({
  type: type.startRequest,
  payload: {
    id,
    method,
    url,
    key,
  },
});

export const stopRequest = payload => ({
  type: type.stopRequest,
  payload,
});
