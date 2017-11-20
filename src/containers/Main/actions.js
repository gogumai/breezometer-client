import { FETCH_DATA, REHYDRATE } from './constants';

export function fetchData(coordinates) {
  return {
    type: FETCH_DATA,
    payload: {
      coordinates,
    },
  };
}

export function rehydrate(data) {
  return {
    type: REHYDRATE,
    payload: {
      data,
    },
  };
}
