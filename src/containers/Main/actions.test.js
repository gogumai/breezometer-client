import * as actions from './actions';
import * as types from './constants';

it('should create an action to fetch data', () => {
  const coordinates = {
    latitude: -34.908591,
    longitude: -56.163077,
  };
  const expectedAction = {
    type: types.FETCH_DATA,
    payload: {
      coordinates,
    },
  };
  expect(actions.fetchData(coordinates)).toEqual(expectedAction)
});

it('should create an action to rehydrate data', () => {
  const data = [{
    location: 'France',
    aq: 20,
    color: '#ff0000',
  }];
  const expectedAction = {
    type: types.REHYDRATE,
    payload: {
      data,
    },
  };
  expect(actions.rehydrate(data)).toEqual(expectedAction)
});
