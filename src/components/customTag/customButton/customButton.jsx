import style from "./custombutton.module.css";
import React from "react";
function CustomButton({ children, onClick, type }) {
  return (
    <>
      <button className={style.button} onClick={onClick} type={type}>
        {children}
      </button>
    </>
  );
}

export default CustomButton;
