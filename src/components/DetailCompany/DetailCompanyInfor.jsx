import React from "react";
import styles from "./DetailCompanyInfor.module.css";

export function DetailCompanyInfor({ company }) {
  return (
    <div className={styles.area}>
      <div className={styles.title}>기업 소개</div>
      <div className={styles.content}>{company.description}</div>
    </div>
  );
}
