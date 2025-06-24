// 나의 기업 비교, 나의 기업 비교 결과 페이지에서 사용되는, 카드 형식으로 회사 하나를 보여주는 컴포넌트입니다.
// name -> 스타일 변화를 위해서 사용할 클래스명
// data -> 해당 컴포에서 보여줘야 하는 실제 data data (객체)
// data 객체에 필요한 프로퍼티: name(회사의 이름. 예시: 코드스테이츠), name2(회사의 분야. 예시: 에듀테크), imgUrl(회사 로고 이미지)

import IcMinus from "../assets/ic_minus.svg";
import { useSetCompareCompany } from "./CompareCompanySection/CompareCompanyContext";
import comIcon from "../assets/main_logo.svg";
import React from "react";
import styles from "./CompanyCard.module.css";

function CompanyCard({ name, data, button = false }) {
  const setCompareCompany = useSetCompareCompany();

  const handleRemoveBtn = () => {
    setCompareCompany((prev) => prev.filter((item) => item !== data));
  };

  return (
    <div className={name === "myCompany" ? styles.my : styles.com}>
      {button ? (
        <img
          className={styles.deleteBtn}
          src={IcMinus}
          onClick={handleRemoveBtn}
          alt="카드 제거 버튼"
        />
      ) : null}
      <div className={styles.content}>
        <img className={styles.img} src={comIcon} alt="회사 로고 이미지" />
        <div>
          <span className={styles.name}>{data.companyName}</span>
          <span className={styles.category}>{data.category}</span>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
