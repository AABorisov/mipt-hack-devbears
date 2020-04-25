import { combineReducers } from 'redux';
import pathReducer from './path/reducer';

export default combineReducers({
  path: pathReducer,
});
