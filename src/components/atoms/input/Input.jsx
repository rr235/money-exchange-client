import React, { useState, useEffect } from 'react';
import { string, func, oneOf, oneOfType, number } from 'prop-types';
import classNames from 'classnames';
import styles from './input.styles.scss';

const Input = ({ label, id, onChange, className, type, value }) => {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const isValidType = (selectedValue, inputType) => {
    if (inputType === 'number') {
      const valueRegex = /^\d*(\.\d{0,2})?$/; // limits to 2 decimal points
      return selectedValue && valueRegex.test(selectedValue);
    }

    return true;
  };

  const onChangeHandler = (e) => {
    const { value: selectedValue } = e.currentTarget;

    // update only if input is valid
    if (isValidType(selectedValue, type)) {
      setInput(selectedValue);
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
  value: oneOfType([string, number]),
};

Input.defaultProps = {
  onChange: null,
  className: null,
  value: null,
};

export default Input;
