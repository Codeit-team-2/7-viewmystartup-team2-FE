// CustomSelectOption.jsx
import React, { useState } from "react";
import styles from "./selectOption.module.css";
import filtericon from "../../assets/filtericon.png";

function CustomSelectOption({ options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    onChange({ target: { value: option.value } }); // 기존 onChange 형태 유지
  };

  return (
    <div className={styles.selectBoxWrapper}>
      <div
        className={styles.selected}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected.label}
        <img className={styles.filtericon} src={filtericon} />
      </div>
      {isOpen && (
        <ul className={styles.optionsList}>
          {options.map((option, idx) => (
            <li
              key={option.value}
              className={`${styles.optionItem} ${
                option.divider ? styles.divider : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelectOption;
