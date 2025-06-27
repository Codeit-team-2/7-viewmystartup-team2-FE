//src/pages/MyCompanyResult/MyCompanyResult.jsx
import React, { useState, useEffect } from "react";
import FetchTable from "../../components/FetchTable/FetchTable";
import { invInitialData } from "../../config/invInitialData_v2";
import SelectOption from "../../components/SelectOption/selectOption";
import CustomButton from "../../components/CustomButton/customButton";
import style from "./MyCompanyResult.module.css";
import Modal from "../../components/Modal/Modal.jsx";
import { useNavigate } from "react-router-dom";
import {
  resultColumns,
  resultColumnsRank,
  myCompanyColumns,
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

const parseRevenue = revenueStr => {
  if (!revenueStr) return 0;
  return parseFloat(revenueStr.replace("억", ""));
};

const topCompanies = [...invInitialData]
  .sort((a, b) => parseRevenue(b.revenue) - parseRevenue(a.revenue))
  .slice(0, 5);

function MyCompanyResult() {
  const [isInvestSuccess, SetIsInvestSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("form");
  const [modalMessage, setModalMessage] = useState("투자가 완료되었어요!");
  const [loginCheckModal, setLoginCheckModal] = useState(false); //로그인 체크
  const { isLoggedIn } = useAuth(); //로그인 체크
  const [testData, setTestData] = useState([]);

  const [myCompany, setMyCompany] = useState({});
  const [compareCompany, setCompareCompany] = useState([]);

  useEffect(() => {
    const savedMyCompany = JSON.parse(
      localStorage.getItem("myCompany") || "[]"
    );
    const savedCompareCompany = JSON.parse(
      localStorage.getItem("compareCompany") || "[]"
    );
    //myCompany 여러개 있어도 맨끝에 온거로 적용
    const lastMyCompany = savedMyCompany[savedMyCompany.length - 1];
    if (!lastMyCompany) return;

    // 이미 compareCompany에 포함된 경우 중복 제거
    const filteredCompare = savedCompareCompany.filter(
      comp => comp.companyName !== lastMyCompany?.companyName
    );

    const companyarray = [lastMyCompany, ...filteredCompare];

    setMyCompany(lastMyCompany || {});
    setCompareCompany(companyarray);

    return () => {
      //Strict모드라서 두번 마운트되면서
      //페이지 들어가자마자 다 사라져버림
      localStorage.removeItem("myCompany");
      localStorage.removeItem("compareCompany");
      // console.log("페이지 이탈로 myCompany compareCompany localStorage 삭제");
    };
  }, []);

  useEffect(() => {
    if (compareCompany.length === 0) return;
    addCompareResult(compareCompany);
  }, [compareCompany]);

  //우진수정
  // const addCompareResult = (newItems) => {
  //   const filtered = newItems.filter(
  //     (item) =>
  //       item &&
  //       typeof item.totalInvestment !== "undefined" &&
  //       typeof item.revenue !== "undefined"
  //   );

  //   const formattedItems = filtered.map((item) => ({
  //     ...item,
  //     totalInvestment: formatFromTrillionFloat(item.totalInvestment),
  //     revenue: formatFromTrillionFloat(item.revenue),
  //     employees: item.employees ? `${item.employees.toLocaleString()}명` : "-",
  //   }));

  //   setTestData(formattedItems);
  // };

  //기존코드
  const addCompareResult = newItems => {
    const formattedItems = newItems.map(item => ({
      ...item,
      totalInvestment: formatFromTrillionFloat(item.totalInvestment),
      revenue: formatFromTrillionFloat(item.revenue),
      employees: item.employees ? `${item.employees.toLocaleString()}명` : "-",
    }));
    setTestData(formattedItems);
  };

  const [companyList, setCompanyList] = useState([]);
  const [sortedCompanyList, setSortedCompanyList] = useState([]);

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
      .catch(err => console.error("데이터 불러오기 실패", err));
  }, []);

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

  const navigate = useNavigate();
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

  // useEffect(() => {
  //   console.log("변경된 myCompany", myCompany);
  // }, [myCompany]);

  // useEffect(() => {
  //   // mount 시: 로컬스토리지 값 읽어서 상태에 반영
  //   const savedMyCompany = JSON.parse(
  //     localStorage.getItem("myCompany") || "[]"
  //   );
  //   const savedCompareCompany = JSON.parse(
  //     localStorage.getItem("compareCompany") || "[]"
  //   );

  //   //혹시 여러개 쌓여있어도 마지막 myCompany만 저장
  //   const lastMyCompany = savedMyCompany[savedMyCompany.length - 1];

  //   //이거 반대로해보자
  //   // if (!lastMyCompany || typeof lastMyCompany !== "object") {
  //   //   setMyCompany(null); // 또는 {}
  //   //   setCompareCompany([]);
  //   //   return;
  //   // }

  //   const filteredCompare = savedCompareCompany.filter(
  //     (comp) => comp.companyName !== lastMyCompany?.companyName
  //   );

  //   const companyarray = [lastMyCompany, ...filteredCompare];

  //   setMyCompany(lastMyCompany || {});
  //   setCompareCompany(companyarray);

  //   return () => {
  //     localStorage.removeItem("myCompany");
  //     localStorage.removeItem("compareCompany");
  //     console.log("페이지 이탈로 myCompany compareCompany localStorage 삭제");
  //   };
  // }, []);

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
