import axios from 'axios';
import {
  FETCH_POCKETS,
  SELECT_POCKET_FROM,
  SELECT_POCKET_TO,
  SET_AMOUNT_FROM,
  SET_AMOUNT_TO,
  SET_EXCHANGE_RATE,
} from './types';

const SERVER_URL = 'http://localhost:5000';

const dispatchExchangeRate = async (dispatch, from, to) => {
  try {
    const { data } = await axios.get(
      `${SERVER_URL}/exchangeRate?from=${from}&to=${to}`
    );
    dispatch({ type: SET_EXCHANGE_RATE, payload: data.conversionRate });
  } catch (error) {
    // TODO: dispatch error.
    console.log(error.response.data);
  }
};

export const fetchPockets = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${SERVER_URL}/pockets`);
    dispatch({
      type: FETCH_POCKETS,
      payload: data,
    });

    // select pockets
    dispatch({ type: SELECT_POCKET_FROM, payload: data[0] });
    dispatch({ type: SELECT_POCKET_TO, payload: data[1] });

    // set exchange rate
    dispatchExchangeRate(dispatch, data[0].code, data[2].code);
  } catch (error) {
    // TODO: dispatch error.
    console.log(error.response.data);
  }
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

export const setExchangeAmountFrom = ({ amount, rate }) => async (dispatch) => {
  dispatch({
    type: SET_AMOUNT_TO,
    payload: Number((amount * rate).toFixed(2)),
  });
};

export const setExchangeAmountTo = ({ amount, rate }) => async (dispatch) => {
  dispatch({
    type: SET_AMOUNT_FROM,
    payload: Number((amount / rate).toFixed(2)),
  });
};

export const setExchangeRate = ({ from, to }) => async (dispatch) =>
  dispatchExchangeRate(dispatch, from, to);

export const exchangeCurrency = (exchangeData) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${SERVER_URL}/exchange`, exchangeData);

    // update all pockets
    dispatch({
      type: FETCH_POCKETS,
      payload: data,
    });

    // update 'from' and 'to' pocket balance
    dispatch({
      type: SELECT_POCKET_FROM,
      payload: data.find((pocket) => pocket.code === exchangeData.from),
    });
    dispatch({
      type: SELECT_POCKET_TO,
      payload: data.find((pocket) => pocket.code === exchangeData.to),
    });

    // reset 'from' and 'to' amounts
    dispatch({ type: SET_AMOUNT_FROM, payload: 0 });
    dispatch({ type: SET_AMOUNT_TO, payload: 0 });
  } catch (error) {
    // TODO: dispatch error.
    console.log(error.response.data);
  }
};
