import { SELECT_POCKET_TO, SET_AMOUNT_TO } from '../actions/types';

export default function (state = { pocket: {}, amount: 0 }, action) {
  if (action.type === SELECT_POCKET_TO) {
    return { pocket: action.payload, amount: state.amount };
  }
  if (action.type === SET_AMOUNT_TO) {
    return { ...state, amount: action.payload };
  }
  return state;
}
