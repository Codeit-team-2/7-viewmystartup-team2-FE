import React, { useEffect, useState } from "react";
import styles from "./CompanySelectBtn.module.css";
import { useCompareCompany } from "../CompareCompanySection/CompareCompanyContext";

function CompanySelectBtn({ isSelected, onSwitch }) {
  const [text, setText] = useState("");
  const compareCompany = useCompareCompany();

  const onBtnClick = () => {
    if (compareCompany.length >= 5 && !isSelected) {
      alert("비교 기업은 5개까지만 선택 가능합니다.");
    } else {
      onSwitch();
    }
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
