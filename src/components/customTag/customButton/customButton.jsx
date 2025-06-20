import style from "./custombutton.module.css";
import React from "react";
function CustomButton({ children, onClick, type, buttonClass }) {
  return (
    <>
      <button
        className={`${style.button} ${buttonClass}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </>
  );
}

export default CustomButton;
