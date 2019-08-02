import {
  GET_ALL_WEATHER,
  GET_ALL_WEATHER_REQUEST,
  GET_ALL_WEATHER_FAILURE,
  UPDATE_INDEX
} from "../constants/weatherConstants";

export const getAllWeather = () => {
  return dispatch => {
    dispatch(getWeatherRequest());

    fetch(
      "http://apis.is/weather/forecasts/en?stations=1,5544,422,3658,3976,4828"
    )
      .then(json => json.json())
      .then(data => dispatch(getWeatherSuccess(data)))
      .catch(error => dispatch(getWeatherFailure(error)));
  };
};

const getWeatherRequest = () => {
  return {
    type: GET_ALL_WEATHER_REQUEST
  };
};
const getWeatherSuccess = weathers => {
  return {
    type: GET_ALL_WEATHER,
    payload: weathers.results
  };
};

const getWeatherFailure = error => {
  return {
    type: GET_ALL_WEATHER_FAILURE,
    payload: error
  };
};

export const getIndexPayload = index => ({
  type: UPDATE_INDEX,
  payload: index
});
