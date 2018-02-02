import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import api from './api/reducer';
// import scenes from './scenes/reducer';

const rootReducer = combineReducers({
  api,
  // scenes,
  routing: routerReducer
});

export default rootReducer;