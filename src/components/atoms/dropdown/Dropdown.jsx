import React, { useState } from 'react';
import {
  string,
  shape,
  arrayOf,
  oneOfType,
  number,
  func,
  bool,
} from 'prop-types';
import classNames from 'classnames';
import styles from './dropdown.styles.scss';

const KEY_ENTER = 13;

// Represents option item in the dropdown
const DropdownListItem = ({ value, text, selected, onClick }) => {
  const onClickHandler = () => {
    onClick({ value, text });
  };

  const onKeyDown = (e) => {
    // selects option on enter key press
    if (e.keyCode === KEY_ENTER) {
      onClick({ value, text });
    }
  };

  return (
    <li
      data-value={value}
      role="option"
      aria-selected={selected}
      key={value}
      onClick={onClickHandler}
      className={styles.option}
      onKeyDown={onKeyDown}
      tabIndex="0"
    >
      {text}
    </li>
  );
};

const Dropdown = ({ options, onSelect, className, selectedValue }) => {
  const [showOptions, setShowOptions] = useState(false); // flag to show hide options
  const optionsClassName = classNames(styles.options, {
    [styles.show]: showOptions,
  });
  const dropdownClassName = classNames(styles.dropdown, className);

  // handles option selection
  const onOptionSelectHandler = ({ text, value }) => {
    setShowOptions(false);
    if (onSelect) {
      onSelect({ text, value });
    }
  };

  const onClickHandler = () => {
    // toggle options
    setShowOptions(!showOptions);
  };

  // gets the selected option text for the selection. Default selection is the first option
  const getSelectionText = () => {
    const selection = options.filter(
      (option) => option.value === selectedValue
    );
    return selection.length ? selection[0].text : options[0].text;
  };

  return (
    <div className={dropdownClassName}>
      <button
        type="button"
        aria-haspopup="listbox"
        onClick={onClickHandler}
        className={styles.button}
      >
        {getSelectionText()}
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

const optionsShape = shape({
  text: string,
  value: oneOfType([string, number]),
});

DropdownListItem.propTypes = {
  value: oneOfType([string, number]).isRequired,
  text: string.isRequired,
  selected: bool,
  onClick: func,
};

DropdownListItem.defaultProps = {
  selected: false,
  onClick: () => {},
};

Dropdown.propTypes = {
  options: arrayOf(optionsShape).isRequired,
  onSelect: func,
  className: string,
  selectedValue: string,
};

Dropdown.defaultProps = {
  onSelect: null,
  className: null,
  selectedValue: undefined,
};

export default Dropdown;
export { DropdownListItem };
