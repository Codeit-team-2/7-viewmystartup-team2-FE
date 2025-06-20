import { Link } from "react-router-dom";
import {
  useCompareCompany,
  useIsCompareCompany,
} from "../CompareCompanySection/CompareCompanyContext";
import {
  useIsMyCompany,
  useMyCompany,
} from "../MyCompanySection/MyCompanyContext";
import "./CompareButtonSection.css";
import React from "react";

function CompareButtonSection() {
  const isMyCompany = useIsMyCompany();
  const isCompareCompany = useIsCompareCompany();
  const cond = isMyCompany && isCompareCompany;

  const MyCompany = useMyCompany(); // 객체
  const CompareCompany = useCompareCompany(); //리스트

  const handleCompareBtn = () => {
    if (!cond) {
      alert("비교할 회사가 선택되지 않았습니다.");
      return;
    }

    try {
      let prevMyCompany = JSON.parse(localStorage.getItem("myCompany"));

      // 배열이 아닐 경우 초기화
      if (!Array.isArray(prevMyCompany)) {
        prevMyCompany = [];
      }

      const isDuplicate = prevMyCompany.some(
        (company) => company.id === MyCompany.id
      );

      if (!isDuplicate) {
        const updatedMyCompany = [...prevMyCompany, MyCompany];
        localStorage.setItem("myCompany", JSON.stringify(updatedMyCompany));
      }

      localStorage.setItem("compareCompany", JSON.stringify(CompareCompany));
      alert("기업 정보가 저장되었습니다!");
    } catch (error) {
      console.error("로컬스토리지 저장 중 에러:", error);
    }
  };

  return (
    <>
      <Link to="/mycompanyresult">
        <button className="compareBtn" onClick={handleCompareBtn}>
          기업 비교하기
        </button>
      </Link>
    </>
  );
}

export default CompareButtonSection;
