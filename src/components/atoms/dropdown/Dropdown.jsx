import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './dropdown.styles.scss';

const getSelection = (options) => {
  const selection = options.filter((option) => option.selected);
  return selection.length ? selection[0].text : options[0].text;
};

const DropdownListItem = ({ value, text, selected, onClick }) => {
  const onClickHandler = () => {
    onClick({ value, text });
  };

  return (
    <li
      data-value={value}
      role="option"
      aria-selected={selected}
      key={value}
      onClick={onClickHandler}
      className={styles.option}
    >
      {text}
    </li>
  );
};

const Dropdown = ({ options, onSelect, className }) => {
  const [showOptions, setShowOptions] = useState(false);

  const optionsClassName = classNames(styles.options, {
    [styles.show]: showOptions,
  });
  const buttonClassName = classNames(styles.button, className);

  const onOptionSelectHandler = ({ text, value }) => {
    setShowOptions(false);
    onSelect({ text, value });
  };

  const onClickHandler = () => {
    // toggle options
    setShowOptions(!showOptions);
  };

  return (
    <div className={styles.dropdown}>
      <button
        type="button"
        aria-haspopup="listbox"
        onClick={onClickHandler}
        className={buttonClassName}
      >
        {getSelection(options)}
      </button>
      <ul role="listbox" className={optionsClassName}>
        {options.map(({ value, text, selected }) => (
          <DropdownListItem
            value={value}
            text={text}
            selected={selected}
            key={value}
            onClick={onOptionSelectHandler}
          />
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
