import { Link } from "react-router-dom";
import {
  useCompareCompany,
  useIsCompareCompany,
} from "../CompareCompanySection/CompareCompanyContext";
import {
  useIsMyCompany,
  useMyCompany,
} from "../MyCompanySection/MyCompanyContext";
import React from "react";
import {
  createCompareCompanySelection,
  createMyCompanySelection,
} from "../../api/api";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./CompareButtonSection.module.css";

function CompareButtonSection() {
  const { userId } = useAuth();

  const isMyCompany = useIsMyCompany();
  const isCompareCompany = useIsCompareCompany();
  const cond = isMyCompany && isCompareCompany;

  const MyCompany = useMyCompany(); // 객체
  const CompareCompany = useCompareCompany(); //리스트

  const handleCompareBtn = async () => {
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

    // 버튼 클릭하면 선택한 내역 백엔드에 post
    try {
      const companyId = MyCompany.id;
      const companyIds = CompareCompany.map((c) => c.id);

      const newMySelectionResult = await createMyCompanySelection(
        userId,
        companyId
      );
      const newCompareSelectionResult = await createCompareCompanySelection(
        userId,
        companyIds
      );
      console.log(newMySelectionResult);
      console.log(newCompareSelectionResult);
    } catch (e) {
      if (e.response) {
        // 리퀘스트는 성공했지만 상태 코드가 실패(4XX, 5XX)를 나타냄
        console.log(e.response.status);
        console.log(e.response.data);
      } else {
        // 리퀘스트 자체가 실패
        console.log("리퀘스트가 실패했습니다.");
      }
    }
  };

  return (
    <>
      {!cond && <div className={styles.unactive}>기업 비교하기</div>}
      {cond && (
        <Link to="/mycompanyresult" className={styles.link}>
          <button className={styles.compareBtn} onClick={handleCompareBtn}>
            기업 비교하기
          </button>
        </Link>
      )}
    </>
  );
}

export default CompareButtonSection;
