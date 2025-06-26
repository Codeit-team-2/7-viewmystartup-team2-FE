// TooltipComponent.jsx
import React from "react";
import styles from "./ToolTip.module.css";

const TooltipComponent = ({ text, tooltip }) => {
  return (
    <div className={styles.tooltipwrapper}>
      <span className={styles.text}>{text}</span>
      <div className={styles.tooltiptext}>{tooltip}</div>
    </div>
  );
};

export default TooltipComponent;
