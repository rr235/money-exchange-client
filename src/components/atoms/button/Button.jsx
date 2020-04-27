import React, { Component, MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './button.styles.scss';

class Button extends Component {
  render() {
    const { children, className, onClick } = this.props;
    return (
      <button
        className={classNames(styles.button, className)}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}

export default Button;
