//흠 뭐해야할까 일단 기본적인 틀만들어볼까? ..
import FetchTable from "../../components/FetchTable/FetchTable";
import { invInitialData } from "../../config/invInitialData_v2";
import SelectOption from "../../components/SelectOption/selectOption";
import CustomButton from "../../components/customTag/customButton/customButton";
import style from "./MyCompanyResult.module.css";
import { useState } from "react";
import Modal from "../../components/Modal/Modal.jsx";
import {
  resultColumns,
  resultColumnsRank,
} from "../../config/columnsConfig.js";
import { resultOptionsData } from "../../config/filterConfig.js";
import InvestmentForm from "../../components/InvestmentForm/InvestmentForm.jsx";

// 임시용입니다
const parseRevenue = (revenueStr) => {
  if (!revenueStr) return 0;
  return parseFloat(revenueStr.replace("억", ""));
};

const topCompanies = [...invInitialData]
  .sort((a, b) => parseRevenue(b.revenue) - parseRevenue(a.revenue))
  .slice(0, 5);

const handleChange = (e) => {
  console.log("선택된 값:", e.target.value);
};
// 여기까지임시용입니다

function MyCompanyResult() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("form");

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
      <div className={style.spaceBetween}>
        {/* <MyCompanySection></MyCompanySection> */}
        <CustomButton className={style.center}>다른기업비교하기</CustomButton>
      </div>
      <div className={style.tableContainer}>
        <div className={style.spaceBetween}>
          <span className={style.titleStyle}>비교 결과 확인하기</span>
          <SelectOption
            options={resultOptionsData}
            onChange={handleChange}
          ></SelectOption>
        </div>
        <FetchTable data={invInitialData.slice(0, 5)} columns={resultColumns} />
      </div>
      <div className={style.tableContainer}>
        <div className={style.spaceBetween}>
          <span className={style.titleStyle}>기업 순위 확인하기</span>
          <SelectOption
            options={resultOptionsData}
            onChange={handleChange}
          ></SelectOption>
        </div>
        {/* 여기서 데이터가 기업순위에따라 불러오면되는거잖아? 그럼 함수위에하나만들어야하나?아니면
        훅으로빼서 제어해야하나? 
        */}
        <FetchTable data={topCompanies} columns={resultColumnsRank} />
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
