// src/components/Modal/Modal.js
import styles from "./Modal.module.css";
import React from "react";

function Modal({ onClose, children, size = "default" }) {
  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.modal} ${
          size === "small" ? styles.small : styles.default
        }`}
      >
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
