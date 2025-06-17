import { useIsCompareCompany } from "../CompareCompanySection/CompareCompanyContext";
import { useIsMyCompany } from "../MyCompanySection/MyCompanyContext";
import "./CompareButtonSection.css";
import React from "react";

function CompareButtonSection() {
  const isMyCompany = useIsMyCompany();
  const isCompareCompany = useIsCompareCompany();
  const cond = isMyCompany && isCompareCompany;

  const handleCompareBtn = () => {
    console.log("데이터 전송하는 기능 필요. 지금은 아무 효과 없는 깡통 버튼");
    console.log(isMyCompany);
    console.log(isCompareCompany);
  };

  return (
    <>
      <button className="compareBtn" onClick={handleCompareBtn}>
        기업 비교하기
      </button>
    </>
  );
}

export default CompareButtonSection;
