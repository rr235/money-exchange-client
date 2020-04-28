import React from 'react';
import { func, string, shape, number, arrayOf } from 'prop-types';
import Input from '../../atoms/input';
import Dropdown, { optionsShape } from '../../atoms/dropdown';
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
        selectedValue={selectedValue.code}
      />
    )}
    <span className={styles.balance}>
      {'Balance: '}
      {selectedValue.symbol}
      {selectedValue.balance}
    </span>
    <Input label={label} id={`input-${id}`} onChange={onChange} type="number" />
  </div>
);

CurrencySelector.propTypes = {
  options: arrayOf(optionsShape).isRequired,
  id: string.isRequired,
  label: string,
  onSelect: func,
  onChange: func,
  selectedValue: shape({
    name: string,
    code: string,
    symbol: string,
    balance: number,
  }),
};

CurrencySelector.defaultProps = {
  onSelect: () => {},
  onChange: () => {},
  label: '',
  selectedValue: {},
};

export default CurrencySelector;
