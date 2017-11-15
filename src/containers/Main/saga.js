import { put, takeEvery } from 'redux-saga/effects';

import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
} from './constants';

import getData from './api';

function* fetchData() {
  try {
    const data = yield getData();
    yield put({ type: FETCH_DATA_SUCCESS, data });
  } catch (e) {
    yield put({ type: FETCH_DATA_FAILURE });
  }
}

function* dataSaga() {
  yield takeEvery(FETCH_DATA, fetchData);
}

export default dataSaga;
