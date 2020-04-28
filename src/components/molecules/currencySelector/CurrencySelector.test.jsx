import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import CurrencySelector from './CurrencySelector';

const options = [
  { text: 'option1', value: 'val1' },
  { text: 'option2', value: 'val2' },
  { text: 'option3', value: 'val3' },
];

describe('CurrencySelector', () => {
  it('should render correctly (type="number")', () => {
    const tree = renderer
      .create(
        <CurrencySelector
          options={options}
          id="from"
          label="From"
          selectedValue={{}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
