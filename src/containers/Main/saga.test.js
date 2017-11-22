import { call, put, takeEvery } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import dataSaga, { fetchData } from './saga';
import { getData } from '../../services/api';
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './constants';

it('fetchData saga', () => {
  const action = {
    type: FETCH_DATA,
    payload: {
      coordinates: {
        latitude: -34.908591,
        longitude: -56.163077,
      },
    },
  };

  const generator = cloneableGenerator(fetchData)(action);

  expect(generator.next().value).toEqual(call(getData, action.payload.coordinates));

  const returnResponse = { response: { body: 'some-body' } };
  const returnError = { error: { errorMessage: 'something-bad-happened' } };
  const { response } = returnResponse;
  const { error } = returnError;

  const clone1 = generator.clone();
  expect(clone1.next(returnResponse).value).toEqual(put({ type: FETCH_DATA_SUCCESS, response }));
  expect(clone1.next().done).toBeTruthy();

  const clone2 = generator.clone();
  expect(clone2.next(returnError).value).toEqual(put({ type: FETCH_DATA_FAILURE, error }));
  expect(clone2.next().done).toBeTruthy();
});

it('test dataSaga watcher', () => {
  const generator = dataSaga();
  expect(generator.next().value).toEqual(takeEvery(FETCH_DATA, fetchData));
  expect(generator.next().done).toBeTruthy();
});
