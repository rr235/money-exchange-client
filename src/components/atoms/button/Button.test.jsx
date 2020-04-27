import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  it('should show correct text', () => {
    const component = shallow(<Button>Foobar</Button>);
    expect(component.text()).toBe('Foobar');
  });

  it('should show correct text', () => {
    const Content = () => <span>Foobaz</span>;
    const component = shallow(
      <Button>
        <Content />
      </Button>
    );

    expect(component.contains(<Content />)).toBe(true);
  });
});
