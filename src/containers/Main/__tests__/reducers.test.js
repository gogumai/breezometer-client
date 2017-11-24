import reducer, { initialState } from '../reducers';
import * as types from '../constants';

const breezometerApiResponse = {
  country_name: 'United States',
  breezometer_aqi: 67,
  breezometer_color: '#ff00ff',
};

const france = { location: 'France', aq: 20, color: '#ff0000' };
const eeuu = { location: 'United States', aq: 67, color: '#ff00ff' };

const data = [france];
const dataNew = [eeuu, ...data];

const appData = { data, isFetching: false, error: '' };
const appDataNew = { ...appData, data: dataNew };

const appDataFetching = { ...appData, isFetching: true };

const error = 'Something wrong happened';
const appDataError = { ...appData, error };

it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('test REHYDRATE with data', () => {
  expect(reducer(
    {},
    {
      type: types.REHYDRATE,
      payload: {
        data,
      },
    },
  )).toEqual({ ...initialState, data });
});

it('test REHYDRATE with no data', () => {
  expect(reducer(
    {},
    {
      type: types.REHYDRATE,
      payload: {},
    },
  )).toEqual({ ...initialState });
});

it('test FETCH_DATA', () => {
  expect(reducer(
    appData,
    {
      type: types.FETCH_DATA,
      payload: {},
    },
  )).toEqual(appDataFetching);
});

it('test FETCH_DATA_SUCCESS', () => {
  expect(reducer(
    appData,
    {
      type: types.FETCH_DATA_SUCCESS,
      response: {
        ...breezometerApiResponse,
      },
    },
  )).toEqual(appDataNew);
});

it('test FETCH_DATA_FAILURE', () => {
  expect(reducer(
    appData,
    {
      type: types.FETCH_DATA_FAILURE,
      error,
    },
  )).toEqual(appDataError);
});
