import { Link } from "react-router-dom";
import {
  useIsCompareCompany,
  useSetCompareCompany,
} from "../CompareCompanySection/CompareCompanyContext";
import { useIsMyCompany, useSetMyCompany } from "./MyCompanyContext";
import React from "react";

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
        {type && <button onClick={handleAllReset}>전체 초기화</button>}
        {!type && (
          <Link to="/mycompanycompare">
            <button>다른 기업 비교하기</button>
          </Link>
        )}
      </>
    );
  }

  return;
}

export default MyCompanyReset;
