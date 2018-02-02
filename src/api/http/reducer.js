/* eslint-disable no-console */
import _ from 'lodash';

import { createSelector } from 'reselect';
import { type } from './actions';

const INITIAL_STATE = {
  runningRequests: {},
  keyIndex: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.startRequest: {
      console.log("START", action.payload.key);
      const request = {
        method: action.payload.method,
        url: action.payload.url,
        key: action.payload.key,
      };

      if (action.payload.key) {
        if (state.keyIndex[action.payload.key] !== undefined) {
          console.warn(
            `a request with key ${action.payload.key} is already running`,
          );
        }
      }
     
      const k = {
        ...state,
        runningRequests: {
          ...state.runningRequests,
          [action.payload.id]: request,
        },
        keyIndex: {
          ...state.keyIndex,
          [action.payload.key]: request,
        },
      };
      console.log('running requests', k)
      return k;
    }

    case type.stopRequest: {
      const request = state.runningRequests[action.payload];
      console.log("STOP", action.payload)

      if (request) {
        const runningRequests = _.omit(state.runningRequests, [action.payload]);
        const keyIndex = _.omit(state.keyIndex, [request.key]);
        
        return { 
          ...state,
          runningRequests,
          keyIndex,
        };
      }
      return state;
    }
    default:
      return state;
  }
};

// selectors
const select = state => state.api.http;

export const isRunning = state => select(state).runningRequests.size > 0;

export const isRequestRunningFactory = key =>
  createSelector(s => select(s).keyIndex, s => s[key] !== undefined);

export function isRequestRunning (state, key) {
  console.log("SELECTOR", select(state), key)
  console.log("KEYINDEX", select(state).keyIndex)
  const t = select(state).keyIndex[key]
  console.log('SELECTED', t);

  return select(state).keyIndex[key] !== undefined;
}
