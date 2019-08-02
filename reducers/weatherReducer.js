import {
  GET_ALL_WEATHER,
  GET_ALL_WEATHER_FAILURE,
  GET_ALL_WEATHER_REQUEST,
  UPDATE_INDEX
} from "../constants/weatherConstants";

const initialState = {
  results: [],
  isFetching: true,
  error: undefined,
  index: 0
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_WEATHER_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case GET_ALL_WEATHER_REQUEST:
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    case GET_ALL_WEATHER:
      return {
        ...state,
        results: action.payload,
        isFetching: false
      };
    case UPDATE_INDEX:
      return { ...state, index: action.payload };

    default:
      return state;
  }
};

export default weatherReducer;
