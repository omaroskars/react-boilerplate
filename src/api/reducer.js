import { combineReducers } from 'redux';

import httpReducer from './http/reducer';

export default combineReducers({
  http: httpReducer,
});