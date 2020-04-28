import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  it('should render correctly', () => {
    const tree = renderer
      .create(
        <Button type="button" id="id">
          Foobar
        </Button>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show correct text', () => {
    const component = shallow(
      <Button type="button" id="id">
        Content
      </Button>
    );
    expect(component.text()).toBe('Content');
  });

  it('should show correct text', () => {
    const Content = () => <span>Content</span>;
    const component = shallow(
      <Button type="button" id="id">
        <Content />
      </Button>
    );

    expect(component.contains(<Content />)).toBe(true);
  });
});
