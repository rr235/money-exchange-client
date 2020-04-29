import { SELECT_POCKET_FROM, SET_AMOUNT_FROM } from '../actions/types';

const initialState = { pocket: {}, amount: 0, exceedBalance: false };

export default function (state = initialState, action) {
  if (action.type === SELECT_POCKET_FROM) {
    const exceedsBalance = action.payload.balance < state.amount;
    return { pocket: action.payload, amount: state.amount, exceedsBalance };
  }
  if (action.type === SET_AMOUNT_FROM) {
    const exceedsBalance = state.pocket.balance < action.payload;
    return { ...state, amount: action.payload, exceedsBalance };
  }
  return state;
}
