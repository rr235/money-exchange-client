import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './dropdown.styles.scss';

type Option = {
  value: number | string;
  text: string;
  selected?: boolean;
  onClick?(value: Option): void;
};

type props = {
  className?: string;
  options: Option[];
  onSelect?(value: Option): void;
};

const getSelection = (options: Option[]): string => {
  const selection = options.filter((option) => option.selected);
  return selection.length ? selection[0].text : options[0].text;
};

const DropdownListItem = ({ value, text, selected, onClick }: Option) => {
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
    >
      {text}
    </li>
  );
};

const Dropdown = ({ options, onSelect, className }: props) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const optionsClassName = classNames(styles.options, {
    [styles.show]: showOptions,
  });
  const buttonClassName = classNames(styles.button, className);

  const onOptionSelectHandler = ({ text, value }: Option) => {
    onSelect({ text, value });
  };

  const onClickHandler = () => {
    // toggle options
    setShowOptions(!showOptions);
  };

  return (
    <>
      <button
        type="button"
        aria-haspopup="listbox"
        onClick={onClickHandler}
        className={buttonClassName}
      >
        {getSelection(options)}
      </button>
      <ul role="listbox" className={optionsClassName}>
        {options.map(({ value, text, selected }: Option) => (
          <DropdownListItem
            value={value}
            text={text}
            selected={selected}
            key={value}
            onClick={onOptionSelectHandler}
          />
        ))}
      </ul>
    </>
  );
};

export default Dropdown;
