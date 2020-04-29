import React from 'react';
import { string, func, oneOf, node, bool } from 'prop-types';
import classNames from 'classnames';
import styles from './button.styles.scss';

const Button = ({ children, className, onClick, type, id, isDisabled }) => (
  // eslint-disable-next-line react/button-has-type
  <button
    id={id}
    className={classNames(styles.button, className)}
    onClick={onClick}
    type={type}
    disabled={isDisabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  id: string.isRequired,
  onClick: func,
  className: string,
  type: oneOf(['button', 'submit']).isRequired,
  children: node.isRequired,
  isDisabled: bool,
};

Button.defaultProps = {
  onClick: () => {},
  className: null,
  isDisabled: false,
};

export default Button;
