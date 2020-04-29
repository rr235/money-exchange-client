import { FETCH_POCKETS } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_POCKETS:
      return action.payload;
    default:
      return state;
  }
}
