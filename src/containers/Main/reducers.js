import {
  FETCH_DATA,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
} from './constants';

const initialState = {
  isFetching: false,
  error: '',
  data: [],
};

const ACTION_HANDLERS = {
  [FETCH_DATA]: state => ({
    ...state,
    isFetching: true,
  }),
  [FETCH_DATA_SUCCESS]: (state, action) => {
    const newData = state.data.slice();
    newData.unshift({
      location: action.response.country_name,
      aq: action.response.breezometer_aqi,
      color: action.response.breezometer_color,
    });
    if (newData.length > 5) {
      newData.pop();
    }
    return {
      error: '',
      isFetching: false,
      data: newData,
    };
  },
  [FETCH_DATA_FAILURE]: (state, action) => ({
    ...state,
    isFetching: false,
    error: action.error,
  }),
};

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};
