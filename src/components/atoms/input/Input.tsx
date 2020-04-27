import React, { useState, FormEvent } from 'react';
import classNames from 'classnames';
import styles from './input.styles.scss';

type Props = {
  id: string;
  label: string;
  className?: string;
  onChange?(e: FormEvent<HTMLInputElement>): () => void;
};

const Input = ({ label, id, onChange, className }: Props) => {
  const [input, setInput] = useState('');

  const onChangeHandler = (e: FormEvent<HTMLInputElement>): void => {
    setInput(e.currentTarget.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <label htmlFor={id} className={classNames(styles.label, className)}>
        {label}
      </label>
      <input
        type="number"
        id={id}
        className={styles.input}
        value={input}
        onChange={onChangeHandler}
      />
    </>
  );
};

export default Input;
