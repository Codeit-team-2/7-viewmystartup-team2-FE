import React from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailCompanyTitle.module.css";

export function DetailCompanyTitle({ company }) {
  if (!company) return null;

  return (
    <div className={styles.area}>
      <div className={styles.img} />
      <div className={styles.box}>
        <div className={styles.title}>{company.category}</div>
        <div className={styles.category}>{company.companyName}</div>
      </div>
    </div>
  );
}
