import React from "react";
import styles from "./InputBox.module.css";
export function InputBox({
  label,
  value,
  onChange,
  id,
  type,
  placeholder,
  error,
}) {
  return (
    <div className={styles.inputBox}>
      <label className={styles.labelText}>{label}</label>
      {/* {console.log("comment 값:", value)} */}
      {label === "투자 코멘트" ? (
        <textarea
          className={`${styles.def} ${error ? styles.errorInput : ""}`}
          value={value}
          onChange={onChange}
          id={id}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`${styles.example}  ${error ? styles.errorInput : ""}`}
          type={type}
          value={value}
          onChange={onChange}
          id={id}
          placeholder={placeholder}
        />
      )}
      <div className={styles.error}>{error}</div>
    </div>
  );
}
