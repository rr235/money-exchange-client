import React, { useState } from 'react';
import styles from './main.styles.scss';
import Button from '../../atoms/button';
import Dropdown from '../../atoms/dropdown';

type Option = {
  value: number | string;
  text: string;
  selected?: boolean;
};

const Main = () => {
  const allOptions: Option[] = [
    { text: 'foo', value: 1 },
    { text: 'bar', value: 2, selected: true },
    { text: 'baz', value: 3 },
  ];

  const [options, setOptions] = useState(allOptions);

  const selectionHandler = ({ value: selectedValue }: Option): void => {
    const updatedOptions = options.map(({ text, value }: Option) => ({
      text,
      value,
      selected: value === selectedValue,
    }));
    setOptions(updatedOptions);
  };

  return (
    <div className={styles.main}>
      <Button>Button</Button>
      <Dropdown options={options} onSelect={selectionHandler} />
    </div>
  );
};

export default Main;
