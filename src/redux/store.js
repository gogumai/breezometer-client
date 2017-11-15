import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createReducers from './reducers';
import mainSaga from './../containers/Main/saga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(createReducers(), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);

export default store;
