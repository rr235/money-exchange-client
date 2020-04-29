import { SET_EXCHANGE_RATE } from '../actions/types';

export default function (state = 1, action) {
  if (action.type === SET_EXCHANGE_RATE) {
    return action.payload;
  }
  return state;
}
