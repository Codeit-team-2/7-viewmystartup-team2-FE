import { Link } from "react-router-dom";
import {
  useCompareCompany,
  useIsCompareCompany,
} from "../CompareCompanySection/CompareCompanyContext";
import {
  useIsMyCompany,
  useMyCompany,
} from "../MyCompanySection/MyCompanyContext";
import React, { useState } from "react";
import {
  createCompareCompanySelection,
  createMyCompanySelection,
} from "../../api/api";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./CompareButtonSection.module.css";
import Toast from "../ToastMessage/Toast";
import { useToast } from "../../hooks/useToast";

function CompareButtonSection() {
  const { userId } = useAuth();

  const isMyCompany = useIsMyCompany();
  const isCompareCompany = useIsCompareCompany();
  const cond = isMyCompany && isCompareCompany;

  const MyCompany = useMyCompany(); // 객체
  const CompareCompany = useCompareCompany(); //리스트
  // alert 대신 toast
  const { toastMessage, setToastMessage, showToast, setShowToast } = useToast();

  const handleCompareBtn = async () => {
    if (!cond) {
      setToastMessage("비교할 회사가 선택되지 않았습니다.");
      setShowToast(true);
      return;
    }

    try {
      let prevMyCompany = JSON.parse(localStorage.getItem("myCompany"));

      if (!Array.isArray(prevMyCompany)) {
        prevMyCompany = [];
      }

      // 중복 검사 제거하고 무조건 추가
      const updatedMyCompany = [...prevMyCompany, MyCompany];
      localStorage.setItem("myCompany", JSON.stringify(updatedMyCompany));

      localStorage.setItem("compareCompany", JSON.stringify(CompareCompany));
      setToastMessage("기업 정보가 저장되었습니다!");
      setShowToast(true);
      setTimeout(() => {
        window.location.href = "/mycompanyresult";
      }, 1000);
    } catch (error) {
      setToastMessage("기업 정보 저장이 실패하였습니다.");
      setShowToast(true);
      console.error("로컬스토리지 저장 중 에러:", error);
    }

    // 버튼 클릭하면 선택한 내역 백엔드에 post
    try {
      const companyId = MyCompany.id;
      const companyIds = CompareCompany.map(c => c.id);

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
      <Toast
        message={toastMessage}
        visible={showToast}
        onClose={() => setShowToast(false)}
      />
      {!cond && <div className={styles.unactive}>기업 비교하기</div>}
      {cond && (
        <>
          <button className={styles.compareBtn} onClick={handleCompareBtn}>
            기업 비교하기
          </button>
        </>
      )}
    </>
  );
}

export default CompareButtonSection;
