import { FETCH_DATA } from './constants';

export function fetchData(coordinates) {
  return {
    type: FETCH_DATA,
    payload: {
      coordinates,
    },
  };
}
