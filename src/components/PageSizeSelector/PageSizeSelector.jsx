import React from "react";
import styles from "./PageSizeSelector.module.css";

export default function PageSizeSelector({
  pageSize,
  pageSizeOptions,
  onChange,
}) {
  return (
    <select
      value={pageSize}
      onChange={onChange}
      className={styles.pageSizeSelectorBg}
    >
      {pageSizeOptions.map((size) => (
        <option key={size} value={size}>
          {size}개씩 보기
        </option>
      ))}
    </select>
  );
}
