import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import CurrencySelector from './CurrencySelector';
import Dropdown from '../../atoms/dropdown';
import Input from '../../atoms/input';

const options = [
  { text: 'option1', value: 'val1' },
  { text: 'option2', value: 'val2' },
  { text: 'option3', value: 'val3' },
];

const selectedValue = {
  symbol: 'E',
  code: 'val2',
  balance: 10,
};

describe('CurrencySelector', () => {
  let component;
  beforeAll(() => {
    act(() => {
      component = mount(
        <CurrencySelector
          options={options}
          id="id"
          label="label"
          selectedValue={selectedValue}
          inputValue={10}
        />
      );
    });
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(
        <CurrencySelector
          options={options}
          id="id"
          label="label"
          selectedValue={selectedValue}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show one dropdown', () => {
    expect(component.find(Dropdown)).toHaveLength(1);
  });

  it('should show one input field', () => {
    expect(component.find(Input)).toHaveLength(1);
  });

  it('should show correct selection', () => {
    const dropdownElement = component.find(Dropdown).find('button');
    expect(dropdownElement.text()).toBe('option2');
  });

  it('should show correct input value', () => {
    const inputElement = component.find(Input).find('input');
    expect(inputElement.prop('value')).toBe(10);
  });

  it('should show exceeds balance message when exceeds balance is true', () => {
    let exceedsBalanceMessage = component.find('.exceedsBalanceMessage').text();
    expect(exceedsBalanceMessage).toBe('');

    act(() => {
      component.setProps({ exceedsBalance: true });
    });
    component.update();

    exceedsBalanceMessage = component.find('.exceedsBalanceMessage').text();
    expect(exceedsBalanceMessage).toBe('Exceeds Balance');
  });
});
