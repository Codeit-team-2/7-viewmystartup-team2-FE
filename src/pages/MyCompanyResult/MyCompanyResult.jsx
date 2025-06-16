//흠 뭐해야할까 일단 기본적인 틀만들어볼까? ..
import MyCompanySection from "../../components/MyCompanySection/MyCompanySection";
import FetchTable from "../../components/FetchTable/FetchTable";
import { invInitialData } from "../../config/invInitialData_v2";
import SelectOption from "../../components/SelectOption/selectOption";
import CustomButton from "../../components/customTag/customButton/customButton";
import style from "./MyCompanyResult.module.css";
import { useState } from "react";
import Modal from "../../components/Modal/Modal.jsx";

const columns = [
  { label: "기업명", key: "companyName" },
  { label: "기업 소개", key: "description" },
  { label: "카테고리", key: "category" },
  { label: "누적 투자 금액", key: "totalInvestment" },
  { label: "매출액", key: "revenue" },
  { label: "고용 인원", key: "employees" },
];

const columns2 = [
  { label: "순위", key: "rank" },
  { label: "기업명", key: "companyName" },
  { label: "기업 소개", key: "description" },
  { label: "카테고리", key: "category" },
  { label: "누적 투자 금액", key: "totalInvestment" },
  { label: "매출액", key: "revenue" },
  { label: "고용 인원", key: "employees" },
];
const parseRevenue = (revenueStr) => {
  if (!revenueStr) return 0;
  return parseFloat(revenueStr.replace("억", ""));
};

const topCompanies = [...invInitialData]
  .sort((a, b) => parseRevenue(b.revenue) - parseRevenue(a.revenue))
  .slice(0, 5);

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
        <MyCompanySection name={"내가 선택한 기업"}></MyCompanySection>
        <CustomButton className={style.center}>다른기업비교하기</CustomButton>
      </div>
      <div className={style.tableContainer}>
        <div className={style.spaceBetween}>
          <span className={style.titleStyle}>비교 결과 확인하기</span>
          <SelectOption></SelectOption>
        </div>
        <FetchTable data={invInitialData.slice(0, 5)} columns={columns} />
      </div>
      <div className={style.tableContainer}>
        <div className={style.spaceBetween}>
          <span className={style.titleStyle}>기업 순위 확인하기</span>
          <SelectOption></SelectOption>
        </div>
        {/* 여기서 데이터가 기업순위에따라 불러오면되는거잖아? 그럼 함수위에하나만들어야하나?아니면
        훅으로빼서 제어해야하나? 
        */}
        <FetchTable data={topCompanies} columns={columns2} />
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
              {/* 일단 임시 인풋 만들어봄 컴포넌트있을예정일꺼같음 ㅇㅇ */}
              <h2>기업에 투자하기</h2>
              <p>투자 기업 정보</p>
              <p>코드잇</p>

              <div>
                <p>투자자 이름</p>
                <input></input>
              </div>
              <div>
                <p>투자자 금액액</p>
                <input></input>
              </div>
              <div>
                <p>투자자 코멘트트</p>
                <input></input>
              </div>
              <div>
                <p>투자자 비밀번호</p>
                <input></input>
              </div>
              <div>
                <p>비밀번호 확인</p>
                <input></input>
              </div>
              <div className={style.marginTop}>
                <CustomButton onClick={handleCloseModal}>취소</CustomButton>
                <CustomButton onClick={handleConfirm}>확인</CustomButton>
              </div>
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
