import React, { Component } from 'react';
import styles from './main.styles.scss';
import Button from '../../atoms/button';
import Input from '../../atoms/input';
import Dropdown from '../../atoms/dropdown';

class Main extends Component {
  state = {
    options: [
      { text: 'foo', value: 1 },
      { text: 'bar', value: 2, selected: true },
      { text: 'baz', value: 3 },
    ],
  };

  getOptions = () => {
    return this.props.pockets.map(({ code }) => ({ text: code, value: code }));
  };

  selectionHandler = ({ value: selectedValue }) => {
    const updatedOptions = this.state.options.map(({ text, value }) => ({
      text,
      value,
      selected: value === selectedValue,
    }));
    this.setState({ options: updatedOptions });
  };

  render() {
    return (
      <div className={styles.main}>
        <Button>Button</Button>
        <Dropdown
          options={this.state.options}
          onSelect={this.selectionHandler}
        />
        <Input label="foo" id="txtFoo" />
      </div>
    );
  }
}

export default Main;
