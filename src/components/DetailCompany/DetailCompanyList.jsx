import React from "react";
import styles from "./DetailCompanyList.module.css";

function toKorMoney(num) {
  if (num == null) return "";
  const 조 = Math.floor(num / 1_0000_0000_0000);
  const 억 = Math.floor((num % 1_0000_0000_0000) / 1_0000_0000);

  let result = "";
  if (조 > 0) result += `${조}조 `;
  if (억 > 0 || 조 > 0) result += `${억}억`;
  if (조 === 0 && 억 === 0) result = num.toLocaleString();
  return result.trim();
}

export function DetailCompanyList({ company }) {
  return (
    <div className={styles.area}>
      <div className={styles.box}>
        <div className={styles.title}>누적 투자 금액</div>
        <div className={styles.content}>
          {toKorMoney(company.totalInvestment)} 원
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>매출액</div>
        <div className={styles.content}>{toKorMoney(company.revenue)} 원</div>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>고용 인원</div>
        <div className={styles.content}>{company.employees} 명</div>
      </div>
    </div>
  );
}
