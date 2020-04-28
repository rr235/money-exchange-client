import { combineReducers } from 'redux';
import pocketsReducer from './pocketsReducer';
import fromPocketReducer from './fromPocketReducer';
import toPocketReducer from './toPocketReducer';

export default combineReducers({
  pockets: pocketsReducer,
  from: fromPocketReducer,
  to: toPocketReducer,
});
