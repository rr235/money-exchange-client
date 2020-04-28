import { SELECT_POCKET_FROM } from '../actions/types';

export default function (state = {}, action) {
  if (action.type === SELECT_POCKET_FROM) {
    return action.payload;
  }
  return state;
}
