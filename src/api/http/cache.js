import moment from 'moment';

/* Simple cache solution checks if the request has been made in the last hour */
const cache = new Map();

export const checkCache = (key) => {
  if (cache.has(key)) {
    const timestamp = cache.get(key);
    if (moment(timestamp) > moment()) {
      return true;
    }
    cache.delete(key);
  }

  return false;
};

export const insertIntoCache = key => cache.set(key, moment().add(1, 'h').toISOString());

export const clearCache = () => {
  cache.clear();
};
