import React, { useState } from 'react';
import { string, func, oneOf } from 'prop-types';
import classNames from 'classnames';
import styles from './input.styles.scss';

const Input = ({ label, id, onChange, className, type }) => {
  const [input, setInput] = useState('');

  const isValidType = (value, inputType) => {
    if (inputType === 'number') {
      const valueRegex = /^\d*(\.\d{0,2})?$/; // limits to 2 decimal points
      return value && valueRegex.test(value);
    }

    return true;
  };

  const onChangeHandler = (e) => {
    const { value } = e.currentTarget;

    // update only if input is valid
    if (isValidType(value, type)) {
      setInput(value);
      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <>
      <label htmlFor={id} className={classNames(styles.label, className)}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        className={styles.input}
        value={input}
        onChange={onChangeHandler}
      />
    </>
  );
};

Input.propTypes = {
  label: string.isRequired,
  id: string.isRequired,
  onChange: func,
  className: string,
  type: oneOf(['text', 'number']).isRequired,
};

Input.defaultProps = {
  onChange: null,
  className: null,
};

export default Input;
