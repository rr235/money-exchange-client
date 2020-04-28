import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Dropdown, { DropdownListItem } from './Dropdown';

const options = [
  { text: 'option1', value: 'val1' },
  { text: 'option2', value: 'val2' },
  { text: 'option3', value: 'val3' },
];

describe('Dropdown', () => {
  let component;
  beforeAll(() => {
    component = shallow(<Dropdown options={options} id="id" />);
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(<Dropdown options={options} id="id" selectedValue="val2" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should select first option by default', () => {
    const button = component.find('button');
    expect(button.text()).toBe('option1');
  });

  it('should set correct number of options', () => {
    const dropdownOptions = component.find(DropdownListItem);
    expect(dropdownOptions).toHaveLength(options.length);
  });

  it('options should be hidden by default', () => {
    const dropdownOptions = component.find('ul[role="listbox"]');
    const classList = dropdownOptions.prop('className');
    expect(classList.indexOf('show')).toBe(-1);
  });
});

describe('Dropdown (functionality)', () => {
  let component;
  const mockSelectCallBack = jest.fn();
  beforeEach(() => {
    act(() => {
      component = mount(
        <Dropdown options={options} id="id" onSelect={mockSelectCallBack} />
      );
    });
  });

  it('should show options on activation', () => {
    const button = component.find('button');
    let dropdownOptions = component.find('ul[role="listbox"]');
    let classList = dropdownOptions.prop('className');
    expect(classList.indexOf('show')).toBe(-1); // confirms options are hidden

    // simulate dropdown activation
    act(() => {
      button.props().onClick();
    });

    // update state and get latest ref to options
    component.update();
    dropdownOptions = component.find('ul[role="listbox"]');
    classList = dropdownOptions.prop('className');

    expect(classList.indexOf('show')).toBeGreaterThan(-1);
  });

  it('should select correct options on activation', () => {
    const secondOption = component.find('li').at(1);
    const button = component.find('button');
    expect(button.text()).toBe('option1');

    // simulate selection of second option
    act(() => {
      secondOption.props().onClick();
    });

    expect(mockSelectCallBack).toHaveBeenCalledTimes(1);
    expect(mockSelectCallBack).toHaveBeenCalledWith({
      text: 'option2',
      value: 'val2',
    });
  });
});
