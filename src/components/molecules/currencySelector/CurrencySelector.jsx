import React from 'react';
import classNames from 'classnames';
import {
  func,
  string,
  shape,
  number,
  arrayOf,
  oneOfType,
  bool,
} from 'prop-types';
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
  inputValue,
  exceedsBalance,
}) => {
  const balanceClassName = classNames(styles.balance, {
    [styles.exceedsBalance]: exceedsBalance,
  });
  return (
    <div>
      {!!options.length && (
        <Dropdown
          options={options}
          onSelect={onSelect}
          id={`select-${id}`}
          className={styles.dropdown}
          selectedValue={selectedValue.code}
        />
      )}
      <span className={balanceClassName}>
        {'Balance: '}
        {selectedValue.symbol}
        {selectedValue.balance}
      </span>
      <Input
        label={label}
        id={`input-${id}`}
        onChange={onChange}
        type="number"
        value={inputValue}
      />
      <div className={styles.exceedsBalanceMessage}>
        {exceedsBalance && <span>Exceeds Balance</span>}
      </div>
    </div>
  );
};

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
  inputValue: oneOfType([string, number]),
  exceedsBalance: bool,
};

CurrencySelector.defaultProps = {
  onSelect: () => {},
  onChange: () => {},
  label: '',
  selectedValue: {},
  inputValue: null,
  exceedsBalance: false,
};

export default CurrencySelector;
