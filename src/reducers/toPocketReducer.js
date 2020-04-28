import { SELECT_POCKET_TO } from '../actions/types';

export default function (state = {}, action) {
  if (action.type === SELECT_POCKET_TO) {
    return action.payload;
  }
  return state;
}
