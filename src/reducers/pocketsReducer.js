import {
  FETCH_POCKETS,
  SELECT_POCKET_FROM,
  SELECT_POCKET_TO,
} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_POCKETS:
      return action.payload;
    // case SELECT_POCKET_FROM:
    //   // eslint-disable-next-line no-case-declarations
    //   const from = JSON.parse(JSON.stringify(state.from));
    //   const newFrom = from.map(({ code, ...rest }) => ({
    //     code,
    //     rest,
    //     selected: code === action.payload,
    //   }));
    //   console.log(newFrom);
    //   return { to: state.to, from: newFrom };
    default:
      return state;
  }
}
