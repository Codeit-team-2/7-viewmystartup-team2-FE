import React, { useEffect, useState } from "react";
import styles from "./CompanySelectBtn.module.css";

function CompanySelectBtn({ isSelected, onSwitch }) {
  const [text, setText] = useState("");
  const onBtnClick = () => {
    onSwitch();
  };

  useEffect(() => {
    if (isSelected) {
      setText("선택 완료");
    } else {
      setText("선택하기");
    }
  }, [isSelected]);

  return (
    <button
      className={isSelected ? styles.selected : styles.unSelected}
      onClick={onBtnClick}
    >
      {text}
    </button>
  );
}

export default CompanySelectBtn;
