import { fork } from 'redux-saga/effects';
import api from './api/saga';

export default function* () {
  yield fork(api);
}
