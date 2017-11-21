import {
  REHYDRATE,
  FETCH_DATA,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
} from './constants';

export const initialState = {
  isFetching: false,
  error: '',
  data: [],
};

const ACTION_HANDLERS = {
  [REHYDRATE]: (state, action) => {
    if (action.payload.data) {
      return {
        ...initialState,
        data: action.payload.data,
      };
    }
    return initialState;
  },
  [FETCH_DATA]: state => ({
    ...state,
    isFetching: true,
  }),
  [FETCH_DATA_SUCCESS]: (state, action) => {
    const { response: { country_name, breezometer_aqi, breezometer_color } } = action;
    const newData = {
      location: country_name,
      aq: breezometer_aqi,
      color: breezometer_color,
    };
    return {
      error: '',
      isFetching: false,
      data: [newData, ...state.data],
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
