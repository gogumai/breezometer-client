import {
  FETCH_DATA,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
} from './constants';

const initialState = {
  isFetching: false,
  error: false,
  data: [],
};

const ACTION_HANDLERS = {
  [FETCH_DATA]: state => ({
    ...state,
    isFetching: true,
  }),
  [FETCH_DATA_SUCCESS]: (state, action) => {
    const newData = state.data.slice();
    newData.unshift(action.data);
    if (newData.length > 5) {
      newData.pop();
    }
    return {
      ...state,
      isFetching: false,
      data: newData,
    };
  },
  [FETCH_DATA_FAILURE]: state => ({
    ...state,
    isFetching: false,
    error: true,
  }),
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
