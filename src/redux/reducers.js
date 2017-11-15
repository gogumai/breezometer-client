import { combineReducers } from 'redux';
import mainReducers from './../containers/Main/reducers';

export default function createReducers() {
  return combineReducers({
    main: mainReducers,
  });
}
