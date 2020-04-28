import { FETCH_POCKETS, SELECT_POCKET_FROM, SELECT_POCKET_TO } from './types';

const data = [
  { name: 'Euro', code: 'EUR', symbol: '€', balance: 10 },
  { name: 'Pound Sterling', code: 'GBP', symbol: '£', balance: 10 },
  { name: 'US Dollar', code: 'USD', symbol: '$', balance: 10 },
];

export const fetchPockets = () => (dispatch) => {
  dispatch({
    type: FETCH_POCKETS,
    payload: data,
  });
  dispatch({ type: SELECT_POCKET_FROM, payload: data[0] });
  dispatch({ type: SELECT_POCKET_TO, payload: data[1] });
};

export const selectPocketFrom = (currencyCode) => (dispatch) => {
  dispatch({ type: SELECT_POCKET_FROM, payload: currencyCode });
};

export const selectPocketTo = (currencyCode) => (dispatch) => {
  dispatch({ type: SELECT_POCKET_TO, payload: currencyCode });
};
