import { FETCH_POCKETS } from './types';

// eslint-disable-next-line import/prefer-default-export
export const fetchPockets = () => (dispatch) => {
  const data = [
    { name: 'Euro', code: 'EUR', symbol: '€', balance: 10 },
    { name: 'Pound Sterling', code: 'GBP', symbol: '£', balance: 10 },
    { name: 'US Dollar', code: 'USD', symbol: '$', balance: 10 },
  ];
  dispatch({ type: FETCH_POCKETS, payload: data });
};
