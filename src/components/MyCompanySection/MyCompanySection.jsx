import { useEffect, useState } from "react";
import CompanySelectModal from "./CompanySelectModal";
import CompanyCard from "../CompanyCard";
import BtnPlus from "../../assets/btn_plus.png";
import {
  useIsMyCompany,
  useMyCompany,
  useSetIsMyCompany,
  useSetMyCompany,
} from "./MyCompanyContext";
import React from "react";
import MyCompanyReset from "./MyCompanyReset";
import styles from "./MyCompanySection.module.css";

function MyCompanySection({ name, children }) {
  const isMyCompany = useIsMyCompany();
  const setIsMyCompany = useSetIsMyCompany();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const myCompany = useMyCompany();
  const setMyCompany = useSetMyCompany();

  const handleIsModalOpen = (value) => {
    setIsModalOpen(value);
  };

  const type = name === "나의 기업을 선택해 주세요!";

  useEffect(() => {
    if (Object.keys(myCompany).length !== 0) {
      setIsMyCompany(true);
      setIsModalOpen(false);
    } else {
      setIsMyCompany(false);
    }
  }, [myCompany]);

  return (
    <div className={styles.myCompanySection}>
      <div className={styles.header}>
        <h2 className={styles.myCompanySectionTitle}>{name}</h2>
        {children}
      </div>
      <div>
        <div className={styles.myCompanyBox}>
          {!isMyCompany && (
            <div className={styles.plusBtnBackground}>
              <div
                className={styles.myCompanyPlus}
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  className={styles.myCompanyPlusBtn}
                  src={BtnPlus}
                  alt="나의 기업 추가하기 버튼"
                />
                <span className={styles.myCompanyPlusText}>기업 추가</span>
              </div>
            </div>
          )}
          {isMyCompany && (
            <>
              {type && (
                <p className={styles.cancel} onClick={() => setMyCompany({})}>
                  선택 취소
                </p>
              )}
              <CompanyCard name="myCompany" button={false} data={myCompany} />
            </>
          )}
        </div>
      </div>
      {isModalOpen && (
        <CompanySelectModal type="myCompany" onModal={handleIsModalOpen} />
      )}
    </div>
  );
}

export default MyCompanySection;
