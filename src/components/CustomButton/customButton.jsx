import style from "./custombutton.module.css";
import React from "react";
//우진수정 - isLoading 상태관리에 따른 버튼 안눌리게 disabled prop 추가
function CustomButton({
  children,
  onClick,
  type,
  buttonClass,
  disabled = false,
}) {
  return (
    <>
      <button
        className={`${style.button} ${buttonClass}`}
        onClick={onClick}
        type={type}
        disabled={disabled} //우진수정
      >
        {children}
      </button>
    </>
  );
}

export default CustomButton;
