import { combineReducers } from "redux";
import weather from "./weatherReducer";
// Used combineReducer so it is easier to make the app bigger in the future
export default combineReducers({
  weather
});
