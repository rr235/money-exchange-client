import React from 'react';
import classNames from 'classnames';
import styles from './button.styles.scss';

const Button = ({ children, className, onClick, type }) => (
  <button
    className={classNames(styles.button, className)}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default Button;
