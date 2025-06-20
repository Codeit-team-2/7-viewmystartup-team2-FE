import React from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailCompanyTitle.module.css";
console.log("styles:", styles);

export function DetailCompanyTitle({
  company,
  areaClass,
  imgClass,
  boxClass,
  titleClass,
  categoryClass,
}) {
  if (!company) return null;

  return (
    <div className={`${styles.area} ${areaClass}`}>
      <div className={`${styles.img} ${imgClass}`} />
      <div className={`${styles.box} ${boxClass}`}>
        <div className={`${styles.title} ${titleClass}`}>
          {company.companyName}
        </div>
        <div className={`${styles.category} ${categoryClass}`}>
          {company.category}
        </div>
      </div>
    </div>
  );
}
