import { useState, useEffect } from "react";
import {
  useIsMyCompany,
  useMyCompany,
} from "../MyCompanySection/MyCompanyContext";
import {
  useCompareCompany,
  useIsCompareCompany,
  useSetIsCompareCompany,
} from "./CompareCompanyContext";
import CompanyCard from "../CompanyCard";
import CompanySelectModal from "../MyCompanySection/CompanySelectModal";
import React from "react";
import styles from "./CompareCompanySection.module.css";

function CompareCompanySection() {
  const isMyCompany = useIsMyCompany();
  const isCompareCompany = useIsCompareCompany();
  const setIsCompareCompany = useSetIsCompareCompany();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const myCompany = useMyCompany();
  const compareCompany = useCompareCompany();

  const handleIsModalOpen = (value) => {
    setIsModalOpen(value);
  };

  useEffect(() => {
    if (Object.keys(compareCompany).length !== 0) {
      setIsCompareCompany(true);
    } else {
      setIsCompareCompany(false);
    }
    console.log(`비교회사: ${compareCompany}`);
  }, [compareCompany]);

  if (!isMyCompany) {
    return;
  } // 나의 기업을 선택한 상황에서만 비교 기업 선택하는 필드가 나오게 함

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          어떤 기업이 궁금하세요? <span>(최대 5개)</span>{" "}
        </h2>
        <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
          기업 추가하기
        </button>
      </div>
      <div>
        <div className={styles.background}>
          {!isCompareCompany && (
            <p className={styles.noCompanyText}>
              아직 추가한 기업이 없어요, <br />
              버튼을 눌러 기업을 추가해보세요!
            </p>
          )}

          {isCompareCompany && (
            <div className={styles.companies}>
              {compareCompany.map((company) => (
                <CompanyCard
                  key={company.id}
                  name="compareCompany"
                  button={true}
                  data={company}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <CompanySelectModal
          type="compareCompany"
          onModal={handleIsModalOpen}
          id={myCompany.id}
        />
      )}
    </div>
  );
}

export default CompareCompanySection;
