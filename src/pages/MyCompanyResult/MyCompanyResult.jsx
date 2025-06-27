//src/pages/MyCompanyResult/MyCompanyResult.jsx
import React, { useState, useEffect } from "react";
import FetchTable from "../../components/FetchTable/FetchTable";
import SelectOption from "../../components/SelectOption/selectOption";
import CustomButton from "../../components/CustomButton/customButton";
import style from "./MyCompanyResult.module.css";
import Modal from "../../components/Modal/Modal.jsx";
import { useNavigate } from "react-router-dom";
import {
  resultColumns,
  resultColumnsRank,
} from "../../config/columnsConfig.js";
import { resultOptionsData, sortFunctions } from "../../config/filterConfig.js";
import InvestmentForm from "../../components/InvestmentForm/InvestmentForm.jsx";
import { MyCompanyProvider } from "../../components/MyCompanySection/MyCompanyContext.jsx";
import { CompareCompanyProvider } from "../../components/CompareCompanySection/CompareCompanyContext.jsx";
import MyCompanySection from "../../components/MyCompanySection/MyCompanySection.jsx";
import btnStyle from "../../components/CustomButton/customButton.module.css";
import { formatFromTrillionFloat } from "../../utils/formatCurrency.js";
import { useAuth } from "../../components/Contexts/AuthContext.jsx";

const apiUrl = import.meta.env.VITE_API_URL;

function MyCompanyResult() {
  const [isInvestSuccess, SetIsInvestSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("form");
  const [modalMessage, setModalMessage] = useState("투자가 완료되었어요!");
  const [loginCheckModal, setLoginCheckModal] = useState(false);
  const { isLoggedIn } = useAuth();
  const [testData, setTestData] = useState([]);
  const navigate = useNavigate();
  const [myCompany, setMyCompany] = useState({});
  const [compareCompany, setCompareCompany] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [sortedCompanyList, setSortedCompanyList] = useState([]);

  useEffect(() => {
    const savedMyCompany = JSON.parse(
      localStorage.getItem("myCompany") || "[]"
    );
    const savedCompareCompany = JSON.parse(
      localStorage.getItem("compareCompany") || "[]"
    );

    const lastMyCompany = savedMyCompany[savedMyCompany.length - 1];
    if (!lastMyCompany) return;

    const filteredCompare = savedCompareCompany.filter(
      comp => comp.companyName !== lastMyCompany?.companyName
    );

    const companyarray = [lastMyCompany, ...filteredCompare];

    setMyCompany(lastMyCompany || {});
    setCompareCompany(companyarray);

    return () => {
      localStorage.removeItem("myCompany");
      localStorage.removeItem("compareCompany");
    };
  }, []); // 로컬스토리지 myCompany, compareCompany 에 값을 넣음

  useEffect(() => {
    if (compareCompany.length === 0) return;
    addCompareResult(compareCompany);
  }, [compareCompany]); // compareCompany가 없으면 끝 있으면 고용인원값에 "명" 붙임

  useEffect(() => {
    fetch(`${apiUrl}/companies`)
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(item => ({
          ...item,
          totalInvestment: formatFromTrillionFloat(item.totalInvestment),
          revenue: formatFromTrillionFloat(item.revenue),
          employees: item.employees
            ? `${item.employees.toLocaleString()}명`
            : "-",
        }));
        setCompanyList(formatted);
        setSortedCompanyList(formatted);
      })
      .catch((err) => console.error("데이터 불러오기 실패", err));
  }, []); // 이거는 테이블데이터를 불러오고 테이블데이터를 재 수정함(한글표기)

  const addCompareResult = (newItems) => {
    const formattedItems = newItems.map((item) => ({
      ...item,
      totalInvestment: formatFromTrillionFloat(item.totalInvestment),
      revenue: formatFromTrillionFloat(item.revenue),
      employees: item.employees ? `${item.employees.toLocaleString()}명` : "-",
    }));
    setTestData(formattedItems);
  }; // 비교회사 테이블값 한글표기화

  const handleCompanySortChange = e => {
    const sortKey = e.target.value;
    const sortFunc = sortFunctions[sortKey];

    setSortedCompanyList(prevData => {
      if (!sortFunc) return prevData;
      return [...prevData].sort(sortFunc);
    });
  };

  const handleSortChange = e => {
    const sortKey = e.target.value;
    const sortFunc = sortFunctions[sortKey];

    if (!sortFunc) return;

    const sorted = [...testData].sort(sortFunc);
    setTestData(sorted);
  };

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      setLoginCheckModal(true);
      return;
    }
    setIsModalOpen(true);
  };
  const handleConfirm = (
    isSuccess = true,
    message = "투자가 완료되었어요!"
  ) => {
    SetIsInvestSuccess(isSuccess);
    setModalMessage(message);
    setModalStep("confirm");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalStep("form");
    if (isInvestSuccess) {
      // 투자성공시 localStorage 초기화
      localStorage.removeItem("myCompany");
      localStorage.removeItem("compareCompany");
      navigate("/investmentoverview"); // 투자성공시 투자현황페이지로
    }
  };

  return (
    <CompareCompanyProvider defaultValue={[]}>
      <MyCompanyProvider
        defaultValue={{
          companyName: myCompany.companyName,
          category: myCompany.category,
          imgUrl: myCompany.imgUrl,
          id: myCompany.id,
        }}
      >
        <div className={style.container}>
          <div className={style.selectCompanydiv}>
            <MyCompanySection name={"내가 선택한 기업"}>
              {" "}
              <CustomButton
                className={style.testdiv}
                onClick={() => navigate("/mycompanycompare")}
              >
                다른기업비교하기
              </CustomButton>
            </MyCompanySection>
          </div>
          <div className={style.tableContainer}>
            <div className={style.spaceBetween}>
              <span className={style.titleStyle}>비교 결과 확인하기</span>
              <SelectOption
                options={resultOptionsData}
                onChange={handleSortChange}
              />
            </div>
            <FetchTable
              data={testData}
              columns={resultColumns}
              tableType="상세페이지X"
            />
          </div>

          <div className={style.tableContainer}>
            <div className={style.spaceBetween}>
              <span className={style.titleStyle}>기업 순위 확인하기</span>
              <SelectOption
                options={resultOptionsData}
                onChange={handleCompanySortChange}
              />
            </div>

            <FetchTable
              data={
                sortedCompanyList.length > 5
                  ? sortedCompanyList.slice(0, 5)
                  : sortedCompanyList
              }
              columns={resultColumnsRank}
              tableType="상세페이지X"
            />

            <div className={style.center}>
              <CustomButton onClick={handleOpenModal}>
                나의 기업에 투자하기
              </CustomButton>
            </div>
          </div>
          {loginCheckModal && (
            <Modal onClose={() => setLoginCheckModal(false)} size="small">
              <div className={style.loginModal}>
                <p className={style.loginText}>로그인 후 이용 가능합니다</p>
                <CustomButton
                  buttonClass={btnStyle.buttonLarge}
                  onClick={() => setLoginCheckModal(false)}
                >
                  확인
                </CustomButton>
              </div>
            </Modal>
          )}
          {isModalOpen && (
            <Modal
              onClose={handleCloseModal}
              size={modalStep === "confirm" ? "small" : "default"}
            >
              {modalStep === "form" ? (
                <>
                  <p className={style.modaltitle}>기업에 투자하기</p>
                  <InvestmentForm
                    company={myCompany}
                    onConfirm={handleConfirm}
                    onCancel={handleCloseModal}
                  />
                </>
              ) : (
                <>
                  <div className={style.modalArea}>
                    <p className={style.modalText}>{modalMessage}</p>
                    <CustomButton
                      buttonClass={btnStyle.buttonLarge}
                      onClick={handleCloseModal}
                    >
                      확인
                    </CustomButton>
                  </div>
                </>
              )}
            </Modal>
          )}
        </div>
      </MyCompanyProvider>
    </CompareCompanyProvider>
  );
}

export default MyCompanyResult;
