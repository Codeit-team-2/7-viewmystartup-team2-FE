import React from "react";
import styles from "./DetailCompanyList.module.css";

export function DetailCompanyList({ company }) {
  return (
    <div className={styles.area}>
      <div className={styles.box}>
        <div className={styles.title}>누적 투자 금액</div>
        <div className={styles.content}>{company.totalInvestment}억 원</div>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>매출액</div>
        <div className={styles.content}>{company.revenue}억 원</div>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>고용 인원</div>
        <div className={styles.content}>{company.employees} 명</div>
      </div>
    </div>
  );
}
