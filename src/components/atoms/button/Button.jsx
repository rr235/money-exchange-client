import React from 'react';
import { string, func, oneOf, node } from 'prop-types';
import classNames from 'classnames';
import styles from './button.styles.scss';

const Button = ({ children, className, onClick, type, id }) => (
  // eslint-disable-next-line react/button-has-type
  <button
    id={id}
    className={classNames(styles.button, className)}
    onClick={onClick}
    type={type}
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
};

Button.defaultProps = {
  onClick: () => {},
  className: null,
};

export default Button;
