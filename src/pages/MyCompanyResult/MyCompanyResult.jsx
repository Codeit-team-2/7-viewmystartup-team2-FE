//흠 뭐해야할까 일단 기본적인 틀만들어볼까? ..

import FetchTable from "../../components/FetchTable/FetchTable";
import { invInitialData } from "../../config/invInitialData_v2";
import SelectOption from "../../components/SelectOption/selectOption";
import CustomButton from "../../components/customTag/customButton/customButton";
import style from "./MyCompanyResult.module.css";
import { useState } from "react";
import Modal from "../../components/Modal/Modal.jsx";
import React from "react";

import {
  resultColumns,
  resultColumnsRank,
} from "../../config/columnsConfig.js";
import { resultOptionsData, sortFunctions } from "../../config/filterConfig.js";
import InvestmentForm from "../../components/InvestmentForm/InvestmentForm.jsx";
import { useEffect } from "react";
import MyCompanySection from "../../components/MyCompanySection/MyCompanySection.jsx";
import { MyCompanyProvider } from "../../components/MyCompanySection/MyCompanyContext.jsx";

import MainLogo from "../../assets/main_logo.svg";
import { CompareCompanyProvider } from "../../components/CompareCompanySection/CompareCompanyContext.jsx";

// 임시용입니다

const parseRevenue = (revenueStr) => {
  if (!revenueStr) return 0;
  return parseFloat(revenueStr.replace("억", ""));
};

const topCompanies = [...invInitialData]
  .sort((a, b) => parseRevenue(b.revenue) - parseRevenue(a.revenue))
  .slice(0, 5);

// 여기까지임시용입니다

function MyCompanyResult() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("form");
  const [testData, setTestData] = useState([]);
  const [inputCompany, setInputCompany] = useState({
    companyName: "",
    category: "",
  });

  //
  const [sortedCompanyList, setSortedCompanyList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanyList(data);
        setSortedCompanyList(data); // 초기값
      })
      .catch((err) => console.error("데이터 불러오기 실패", err));
  }, []);
  const handleCompanySortChange = (e) => {
    const sortKey = e.target.value;
    const sortFunc = sortFunctions[sortKey];

    setSortedCompanyList((prevData) => {
      if (!sortFunc) return prevData;
      return [...prevData].sort(sortFunc);
    });
  };
  //
  //
  const [companyList, setCompanyList] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/companies") // 백엔드 서버 주소
      .then((res) => res.json())
      .then((data) => setCompanyList(data))
      .catch((err) => console.error("데이터 불러오기 실패", err));
  }, []);
  //

  //

  const handleSortChange = (e) => {
    const sortKey = e.target.value;
    const sortFunc = sortFunctions[sortKey];

    setTestData((prevData) => {
      if (!sortFunc) return prevData;
      return [...prevData].sort(sortFunc);
    });
  };
  //

  const handleOpenModal = () => setIsModalOpen(true);
  const handleConfirm = () => {
    setModalStep("confirm");
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalStep("form");
  };
  return (
    <div className={style.container}>
      <MyCompanyProvider
        defaultValue={{
          name: "코드잇",
          name2: "에듀테크",
          imgUrl: { MainLogo },
          id: "abc",
        }}
      >
        <CompareCompanyProvider
          defaultValue={[
            {
              name: "코드잇",
              name2: "에듀테크",
              imgUrl: { MainLogo },
              id: "abc",
            },
          ]}
        >
          <MyCompanySection name={"내가 선택한 기업"} />
        </CompareCompanyProvider>
      </MyCompanyProvider>
      <div className="임시테이블 삭제할 div입니다">
        <div className={style.inputTestBox}>
          <input
            type="text"
            placeholder="기업명"
            value={inputCompany.companyName}
            onChange={(e) =>
              setInputCompany((prev) => ({
                ...prev,
                companyName: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="기업소개"
            value={inputCompany.description}
            onChange={(e) =>
              setInputCompany((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="카테고리"
            value={inputCompany.category}
            onChange={(e) =>
              setInputCompany((prev) => ({ ...prev, category: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="누적투자금액"
            value={inputCompany.totalInvestment}
            onChange={(e) =>
              setInputCompany((prev) => ({
                ...prev,
                totalInvestment: e.target.value,
              }))
            }
          />
          <input
            type="text"
            placeholder="매출액"
            value={inputCompany.revenue}
            onChange={(e) =>
              setInputCompany((prev) => ({ ...prev, revenue: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="고용인원"
            value={inputCompany.employees}
            onChange={(e) =>
              setInputCompany((prev) => ({
                ...prev,
                employees: e.target.value,
              }))
            }
          />
          <CustomButton
            onClick={() => {
              if (!inputCompany.companyName || !inputCompany.category) return;
              const newCompany = {
                id: Date.now(), // 임시 ID
                ...inputCompany,
              };
              setTestData((prev) => [...prev, newCompany]);
              setInputCompany({
                companyName: "",
                category: "",
                description: "",
                revenue: "",
                employees: "",
                totalInvestment: "",
              }); // 입력값 초기화
            }}
          >
            추가
          </CustomButton>
        </div>
      </div>
      {/* 여기서부터 내 코드 그위에는삭제되도됨 */}
      <div className={style.spaceBetween}>
        {/* <MyCompanySection></MyCompanySection> */}
        <CustomButton className={style.center}>다른기업비교하기</CustomButton>
      </div>
      <div className={style.tableContainer}>
        {/* 일단 누적되는 데이터 해보기 */}
        <div className={style.spaceBetween}>
          <span className={style.titleStyle}>비교 결과 확인하기</span>
          <SelectOption
            options={resultOptionsData}
            onChange={handleSortChange}
          ></SelectOption>
        </div>
        <FetchTable data={testData} columns={resultColumns} />
      </div>
      <div className={style.tableContainer}>
        <div className={style.spaceBetween}>
          <span className={style.titleStyle}>기업 순위 확인하기</span>

          <SelectOption
            options={resultOptionsData}
            onChange={handleCompanySortChange}
          ></SelectOption>
        </div>
        {/* 여기서 데이터가 기업순위에따라 불러오면되는거잖아? 그럼 함수위에하나만들어야하나?아니면
        훅으로빼서 제어해야하나? 
        */}

        <FetchTable
          data={
            sortedCompanyList.length > 5
              ? sortedCompanyList.slice(0, 5)
              : sortedCompanyList
          }
          columns={resultColumnsRank}
        />

        <div className={style.center}>
          <CustomButton onClick={handleOpenModal}>
            나의 기업에 투자하기
          </CustomButton>
        </div>
      </div>
      {/* 모달 역시 임시로 대충만들어봄 ㅇㅇ */}
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          size={modalStep === "confirm" ? "small" : "default"}
        >
          {modalStep === "form" ? (
            <>
              <InvestmentForm
                onConfirm={handleConfirm}
                onCancel={handleCloseModal}
              ></InvestmentForm>
            </>
          ) : (
            <>
              <p>투자가 완료되었어요!</p>
              <div className={style.marginTop}>
                <CustomButton onClick={handleCloseModal}>확인</CustomButton>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

export default MyCompanyResult;
