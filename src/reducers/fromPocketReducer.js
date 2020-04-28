import { SELECT_POCKET_FROM, SET_AMOUNT_FROM } from '../actions/types';

export default function (state = { pocket: {}, amount: 0 }, action) {
  if (action.type === SELECT_POCKET_FROM) {
    return { pocket: action.payload, amount: state.amount };
  }
  if (action.type === SET_AMOUNT_FROM) {
    return { ...state, amount: action.payload };
  }
  return state;
}
