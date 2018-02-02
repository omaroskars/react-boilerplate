import { fork } from 'redux-saga/effects';

import http from './http/saga';

export default function* () {
  yield fork(http);

}