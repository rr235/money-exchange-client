import axios from 'axios';
import {
  FETCH_POCKETS,
  SELECT_POCKET_FROM,
  SELECT_POCKET_TO,
  SET_AMOUNT_FROM,
  SET_AMOUNT_TO,
  SET_EXCHANGE_RATE,
} from './types';

const dispatchExchangeRate = async (dispatch, from, to) => {
  const { data } = await axios.get(
    `http://localhost:5000/exchange?from=${from}&to=${to}`
  );
  dispatch({ type: SET_EXCHANGE_RATE, payload: data.conversionRate });
};

export const fetchPockets = () => async (dispatch) => {
  const { data } = await axios.get('http://localhost:5000/pockets');
  dispatch({
    type: FETCH_POCKETS,
    payload: data,
  });
  dispatch({ type: SELECT_POCKET_FROM, payload: data[0] });
  dispatch({ type: SELECT_POCKET_TO, payload: data[1] });

  // set exchange rate
  dispatchExchangeRate(dispatch, data[0].code, data[2].code);
};

export const selectPocketFrom = (pocket) => (dispatch) => {
  dispatch({ type: SELECT_POCKET_FROM, payload: pocket });
};

export const selectPocketTo = (pocket) => (dispatch) => {
  dispatch({ type: SELECT_POCKET_TO, payload: pocket });
};

export const setAmountFrom = (amount) => (dispatch) => {
  dispatch({ type: SET_AMOUNT_FROM, payload: amount });
};

export const setAmountTo = (amount) => (dispatch) => {
  dispatch({ type: SET_AMOUNT_TO, payload: amount });
};

export const exchangeAmountFrom = ({ amount, rate }) => async (dispatch) => {
  dispatch({
    type: SET_AMOUNT_TO,
    payload: Number((amount * rate).toFixed(2)),
  });
};

export const exchangeAmountTo = ({ amount, rate }) => async (dispatch) => {
  dispatch({
    type: SET_AMOUNT_FROM,
    payload: Number((amount / rate).toFixed(2)),
  });
};

export const setExchangeRate = ({ from, to }) => async (dispatch) =>
  dispatchExchangeRate(dispatch, from, to);
