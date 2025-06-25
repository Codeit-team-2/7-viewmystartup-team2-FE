import React from "react";
import styles from "./DetailCompanyTitle.module.css";

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
      <img className={`${styles.img} ${imgClass}`} src={company.imgUrl} />
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
