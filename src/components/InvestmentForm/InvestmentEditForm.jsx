import React from "react";
import { DetailCompanyTitle } from "../DetailCompany/DetailCompanyTitle";
import { useErrorCheck } from "./useErrorCheck";
import { InputBox } from "./InputBox";
import CustomButton from "../customTag/customButton/customButton";
import titleStyle from "../DetailCompany//DetailCompanyTitle.module.css";

// const nameErrorText = v =>
//   v.trim() === ""
//     ? "필수 입력 항목입니다."
//     : v.length > 5
//     ? "5자 이내로 입력해주세요"
//     : "";

const amountErrorText = v =>
  v.trim() === ""
    ? "필수 입력 항목입니다."
    : isNaN(v)
    ? "숫자로 입력해주세요"
    : "";

const commentErrorText = v =>
  v.trim() === ""
    ? "필수 입력 항목입니다."
    : v.length > 20
    ? "20자 이내로 입력해주세요"
    : "";

function InvestmentEditForm({ investor, company, onConfirm, onCancel }) {
  // const [investorName, investorNameChange, investorNameError] = useErrorCheck(
  //   investor.name,
  //   nameErrorText
  // );
  const [amount, amountChange, amountError] = useErrorCheck(
    investor.amount,
    amountErrorText
  );
  const [comment, commentChange, commentError] = useErrorCheck(
    investor.comment,
    commentErrorText
  );
  const handleSubmit = e => {
    e.preventDefault();
    if (amountError || commentError) {
      //investorNameError || 제거
      return;
    }
    onConfirm({ ...investor, amount, comment }); // name: investorName,
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>투자 기업 정보</h1>
        <DetailCompanyTitle
          company={company}
          areaClass={titleStyle.areaForm}
          imgClass={titleStyle.imgForm}
          boxClass={titleStyle.boxForm}
          titleClass={titleStyle.titleForm}
          categoryClass={titleStyle.categoryForm}
        />
      </div>
      <div>
        {/* <InputBox
          label="투자자 이름"
          value={investorName}
          onChange={investorNameChange}
          type={"text"}
          id="investorName"
          placeholder="투자자 이름을 입력해주세요"
          error={investorNameError}
        /> */}
        <InputBox
          label="투자 금액"
          value={amount}
          onChange={amountChange}
          type={"number"}
          id="amount"
          placeholder="투자 금액을 입력해 주세요"
          error={amountError}
        />
        <InputBox
          label="투자 코멘트"
          value={comment}
          onChange={commentChange}
          type={"text"}
          id="comment"
          placeholder="투자에 대한 코멘트를 입력해 주세요"
          error={commentError}
        />
      </div>
      <div className={style.backgroudColor}>
        <CustomButton onClick={onCancel} type="button">
          취소
        </CustomButton>
        <CustomButton onClick={onConfirm} type="submit">
          수정하기
        </CustomButton>
      </div>
    </form>
  );
}

export default InvestmentEditForm;
