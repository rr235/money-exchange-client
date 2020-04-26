import React, { Component, MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './button.styles.scss';

type props = {
  className?: string;
  onClick?(event: MouseEvent): () => void;
};

type state = {};

class Button extends Component<props, state> {
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
