import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Main from './Main';
import { fetchPockets } from '../../../actions';

jest.mock('../../../actions');

const mockStore = configureStore([thunk]);

const storeData = {
  pockets: [
    {
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
      balance: 10,
    },
    {
      name: 'Pound Sterling',
      code: 'GBP',
      symbol: '£',
      balance: 10,
    },
    {
      name: 'US Dollar',
      code: 'USD',
      symbol: '$',
      balance: 10,
    },
  ],
  from: {
    pocket: {
      name: 'Euro',
      code: 'EUR',
      symbol: '€',
      balance: 10,
    },
    amount: 0,
    exceedsBalance: false,
  },
  to: {
    pocket: {
      name: 'Pound Sterling',
      code: 'GBP',
      symbol: '£',
      balance: 10,
    },
    amount: 0,
  },
  exchangeRate: 0.87467,
};

describe('Main', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore(storeData);
    store.dispatch = jest.fn();

    component = mount(
      <Provider store={store}>
        <Main />
      </Provider>
    );
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Main />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should fetch pockets data', () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(fetchPockets).toHaveBeenCalled();
  });

  it('from input should have value 0', () => {
    const fromInput = component.find('input[id="input-from"]');
    expect(fromInput.prop('value')).toBe(0);
  });

  it('to input should have value 0', () => {
    const toInput = component.find('input[id="input-to"]');
    expect(toInput.prop('value')).toBe(0);
  });

  it('"from" dropdown should show correct pocket', () => {
    const fromDropdown = component.find('button[id="select-from"]');
    expect(fromDropdown.text()).toBe(storeData.from.pocket.code);
  });

  it('"to" dropdown should show correct pocket', () => {
    const toDropdown = component.find('button[id="select-to"]');
    expect(toDropdown.text()).toBe(storeData.to.pocket.code);
  });
});
