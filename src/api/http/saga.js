/* eslint-disable */
import uuid from 'uuid/v4';
import qs from 'qs';
import moment from 'moment';
import { put, fork, call, takeEvery } from 'redux-saga/effects';

import { startRequest, type, stopRequest } from './actions';
import { LOGIN_RESET } from '../login/types';
import { open } from './request';
import { getToken, setToken } from './token';
import { checkCache, insertIntoCache, clearCache } from './cache';

export function* onStartHttp({
  payload: { method, url, body, resolve, reject, key, params, refresh },
}) {
  const cacheHit = checkCache(key);
  if (!refresh && cacheHit) {
    return;
  }
  const id = yield call(uuid);
  yield put(startRequest(id, method, url, key));
  const result = {
    params,
  };

  try {
    const token = yield call(getToken);
    const { accessToken, expireDate, refreshToken } = qs.parse(token);

    if (params !== null || params !== undefined) {
      url = `${url}?${qs.stringify(params)}`;
    }

    if (moment(expireDate) < moment()) {
      console.warn('Token expired');
      const response = yield call(
        open,
        'post',
        `/user/refreshtoken?refreshtoken=${refreshToken}`,
        undefined,
        false,
      );
      if (response.data.accessToken) {
        yield call(setToken, response);
      } else {
        const errorMessage = new Error('Invalid token from refreshtoken');
        throw errorMessage;
      }
    }

    const requestResult = yield call(open, method, url, body, accessToken);
    result.status = requestResult.status;
    result.data = requestResult.data;
    if (method === 'get') {
      insertIntoCache(key);
    }
    yield put(resolve(result));
  } catch (err) {
    result.status = err.status;
    if (err.error) {
      result.data = err;
    }
    yield put(reject({ ...result, err }));
  } finally {
    yield put(stopRequest(id));
  }
}

export function* onLogOut() {
  yield call(clearCache);
  // yield call(resetToken)
}

export default function* () {
  yield fork(function* watchStartHttp() {
    yield takeEvery(type.start, onStartHttp);
  });
  yield fork(function* watchLogOut() {
    yield takeEvery(LOGIN_RESET, onLogOut);
  });
}
