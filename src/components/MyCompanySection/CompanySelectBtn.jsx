import React from "react";

function CompanySelectBtn({ isSelected, onSwitch }) {
  const onBtnClick = () => {
    onSwitch();
  };

  console.log(`isSelected: ${isSelected}`);

  const text = isSelected ? "선택완료" : "선택하기";

  return <button onClick={onBtnClick}>{text}</button>;
}

export default CompanySelectBtn;
