import { combineReducers } from 'redux';
import pocketsReducer from './pocketsReducer';

export default combineReducers({
  pockets: pocketsReducer,
});
