import { put, call, takeEvery } from 'redux-saga/effects';

import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './constants';

import { getData } from '../../services/api';

export function* fetchData(action) {
  const { response, error } = yield call(getData, action.payload.coordinates);
  if (response) {
    yield put({ type: FETCH_DATA_SUCCESS, response });
  } else {
    yield put({ type: FETCH_DATA_FAILURE, error });
  }
}

function* dataSaga() {
  yield takeEvery(FETCH_DATA, fetchData);
}

export default dataSaga;
