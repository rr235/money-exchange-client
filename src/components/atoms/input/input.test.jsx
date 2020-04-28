import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Input from './Input';

describe('Input ', () => {
  let component;
  beforeAll(() => {
    component = shallow(<Input label="label" id="id" type="number" />);
  });

  it('should render correctly (type="number")', () => {
    const tree = renderer
      .create(<Input label="label" id="id" type="number" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly (type="text")', () => {
    const tree = renderer
      .create(<Input label="label" id="id" type="text" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should contain label', () => {
    expect(component.find('label')).toHaveLength(1);
  });

  it('should contain input field', () => {
    expect(component.find('input[type="number"]')).toHaveLength(1);
  });

  it('should show correct label', () => {
    expect(component.find('label').text()).toBe('label');
  });
});

describe('Input (number) - Functionality', () => {
  let component;
  beforeAll(() => {
    act(() => {
      component = shallow(<Input label="label" id="id" type="number" />);
    });
  });

  it('should take correct input', () => {
    let input = component.find('input[type="number"]');

    // simulate on change with valid input
    act(() => {
      input.props().onChange({
        currentTarget: {
          value: 100,
        },
      });
    });

    // update state and get latest ref to input
    component.update();
    input = component.find('input[type="number"]');

    expect(input.prop('value')).toBe(100);
  });

  it('should show previous input when input is invalid', () => {
    let input = component.find('input[type="number"]');

    // simulate on change with VALID input
    act(() => {
      input.props().onChange({
        currentTarget: {
          value: 100,
        },
      });
    });

    // update state and get latest ref to input
    component.update();
    input = component.find('input[type="number"]');
    expect(input.prop('value')).toBe(100);

    // simulate on change with INVALID input
    act(() => {
      input.props().onChange({
        currentTarget: {
          value: '200,222',
        },
      });
    });

    // update state and get latest ref to input
    component.update();
    input = component.find('input[type="number"]');

    expect(input.prop('value')).toBe(100);
  });
});
