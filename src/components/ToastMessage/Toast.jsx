import React, { useEffect, useRef } from "react";
import styles from "./Toast.module.css";

function Toast({ message, visible, onClose, duration = 2000 }) {
  const timerRef = useRef();

  useEffect(() => {
    if (visible) {
      timerRef.current = setTimeout(onClose, duration);
    }
    return () => clearTimeout(timerRef.current);
  }, [visible, duration, onClose]);

  return (
    <div className={`${styles.toast} ${!visible ? styles["toastHidden"] : ""}`}>
      {message}
    </div>
  );
}

export default Toast;
