import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import Main from './Main';
import DropDown from '../../atoms/dropdown';
import {
  fetchPockets,
  setAmountFrom,
  setExchangeAmountFrom,
  setAmountTo,
  setExchangeAmountTo,
  selectPocketFrom,
  selectPocketTo,
  setExchangeRate,
} from '../../../actions';

jest.mock('../../../actions');

const mockStore = configureStore([thunk]);

const mockExchangeRate = 0.87467;

const eurPocket = {
  name: 'Euro',
  code: 'EUR',
  symbol: '€',
  balance: 10,
};

const gbpPocket = {
  name: 'Pound Sterling',
  code: 'GBP',
  symbol: '£',
  balance: 10,
};

const usdPocket = {
  name: 'US Dollar',
  code: 'USD',
  symbol: '$',
  balance: 10,
};

const storeData = {
  pockets: [eurPocket, gbpPocket, usdPocket],
  from: {
    pocket: eurPocket,
    amount: 0,
    exceedsBalance: false,
  },
  to: {
    pocket: gbpPocket,
    amount: 0,
  },
  exchangeRate: mockExchangeRate,
};

describe('Main', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore(storeData);
    store.dispatch = jest.fn();
    act(() => {
      component = mount(
        <Provider store={store}>
          <Main />
        </Provider>
      );
    });
  });

  it('should fetch pockets data', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(fetchPockets).toHaveBeenCalled();
  });

  it('change in "from" input should dispatch required actions', () => {
    const fromInput = component.find('input[id="input-from"]');

    // simulate 'from' amount change
    act(() => {
      fromInput.props().onChange({ currentTarget: { value: 5 } });
    });
    component.update();

    // should fire actions creators that sets correct 'from' amount
    // and set correct 'to' amount based on conversion rate
    expect(setAmountFrom).toHaveBeenCalledWith(5);
    expect(setExchangeAmountFrom).toHaveBeenCalledWith({
      amount: 5,
      rate: mockExchangeRate,
    });
  });

  it('change in "to" input should dispatch required actions', () => {
    const toInput = component.find('input[id="input-to"]');

    // simulate 'to' amount change
    act(() => {
      toInput.props().onChange({ currentTarget: { value: 5 } });
    });
    component.update();

    // should fire actions creators that sets correct 'to' amount
    // and set correct 'from' amount based on conversion rate
    expect(setAmountTo).toHaveBeenCalledWith(5);
    expect(setExchangeAmountTo).toHaveBeenCalledWith({
      amount: 5,
      rate: mockExchangeRate,
    });
  });

  it('change in "from" dropdown should dispatch required actions', () => {
    const fromDropdown = component.find(DropDown).first();

    // simulate 'from' pocket selection to USD
    act(() => {
      fromDropdown.props().onSelect({ text: 'USD', value: 'USD' });
    });
    component.update();

    // should fire action creators that selects correct 'from' pocket
    // ans set the correct exchange rate
    expect(selectPocketFrom).toHaveBeenCalledWith(usdPocket);
    expect(setExchangeRate).toHaveBeenCalledWith({
      from: usdPocket.code,
      to: storeData.to.pocket.code,
    });
  });

  it('change in "to" dropdown should dispatch required actions', () => {
    const toDropdown = component.find(DropDown).at(1);

    // simulate 'to' pocket selection to USD
    act(() => {
      toDropdown.props().onSelect({ text: 'USD', value: 'USD' });
    });
    component.update();

    // should fire action creators that selects correct 'to' pocket
    // ans set the correct exchange rate
    expect(selectPocketTo).toHaveBeenCalledWith(usdPocket);
    expect(setExchangeRate).toHaveBeenCalledWith({
      from: storeData.from.pocket.code,
      to: usdPocket.code,
    });
  });
});
