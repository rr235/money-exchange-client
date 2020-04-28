import React from 'react';
import Input from '../../atoms/input';
import Dropdown from '../../atoms/dropdown';
import styles from './currencySelector.styles.scss';

const CurrencySelector = ({
  options,
  onSelect,
  onChange,
  label,
  id,
  selectedValue,
}) => (
  <div>
    {options.length && (
      <Dropdown
        options={options}
        onSelect={onSelect}
        id={`select-${id}`}
        className={styles.dropdown}
        selectedValue={selectedValue}
      />
    )}
    <Input label={label} id={`input-${id}`} onChange={onChange} />
  </div>
);

export default CurrencySelector;
