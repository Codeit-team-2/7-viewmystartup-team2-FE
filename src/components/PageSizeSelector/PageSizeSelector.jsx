// PageSizeSelector.jsx
import React, { useState } from "react";
import styles from "./PageSizeSelector.module.css";
import filtericon from "../../assets/filtericon.png";

export default function PageSizeSelector({
  pageSize,
  pageSizeOptions,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = pageSizeOptions.find((opt) => opt === pageSize);

  const handleSelect = (size) => {
    setIsOpen(false);
    onChange({ target: { value: size } }); // 기존 onChange 방식 유지
  };

  return (
    <div className={styles.selectBoxWrapper}>
      <div
        className={styles.selected}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption}개씩 보기
        <img className={styles.filtericon} src={filtericon} alt="filter icon" />
      </div>

      {isOpen && (
        <ul className={styles.optionsList}>
          {pageSizeOptions.map((size) => (
            <li
              key={size}
              className={styles.optionItem}
              onClick={() => handleSelect(size)}
            >
              {size}개씩 보기
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
