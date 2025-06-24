import { Link } from "react-router-dom";
import {
  useIsCompareCompany,
  useSetCompareCompany,
} from "../CompareCompanySection/CompareCompanyContext";
import { useIsMyCompany, useSetMyCompany } from "./MyCompanyContext";
import React from "react";
import styles from "./MyCompanyReset.module.css";

function MyCompanyReset({ type }) {
  const isMyCompany = useIsMyCompany();
  const isCompareCompany = useIsCompareCompany();
  const setMyCompany = useSetMyCompany();
  const setCompareCompany = useSetCompareCompany();

  const handleAllReset = () => {
    setCompareCompany([]);
    setMyCompany({});
  };

  if (isMyCompany && isCompareCompany) {
    return (
      <>
        {type && (
          <button className={styles.btn} onClick={handleAllReset}>
            전체 초기화
          </button>
        )}
        {!type && (
          <Link to="/mycompanycompare">
            <button className={styles.btn}>다른 기업 비교하기</button>
          </Link>
        )}
      </>
    );
  }

  return;
}

export default MyCompanyReset;
