import React, { useState } from "react";
import { DetailCompanyTitle } from "../DetailCompany/DetailCompanyTitle";
import { useErrorCheck } from "./useErrorCheck";
import { InputBox } from "./InputBox";
import { usePasswordCheck } from "./usePasswordCheck";

// 에러 메세지 설정
const nameErrorText = v =>
  v.trim() === ""
    ? "필수 입력 항목입니다."
    : v.length > 5
    ? "5자 이내로 입력해주세요"
    : "";

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

function InvestmentForm({ company }) {
  const [investorName, investorNameChange, investorNameError] = useErrorCheck(
    "",
    nameErrorText
  );
  const [amount, amountChange, amountError] = useErrorCheck(
    "",
    amountErrorText
  );
  const [comment, commentChange, commentError] = useErrorCheck(
    "",
    commentErrorText
  );

  const {
    password,
    checkPassword,
    passwordError,
    handlePasswordChange,
    handleCheckPasswordChange,
  } = usePasswordCheck();

  const isDisavled = () =>
    !investorName ||
    investorNameError ||
    !amount ||
    amountError ||
    !comment ||
    commentError ||
    !password ||
    !checkPassword ||
    passwordError;

  const handleSubmit = e => {
    e.preventDefault();
    if (investorNameError || amountError || commentError || passswordError) {
      return;
    }
    onsubmit({
      companyName: company.companyName,
      investorName,
      amount,
      comment,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>투자 기업 정보</h1>
        <DetailCompanyTitle company={company} />
      </div>
      <div>
        <InputBox
          label="투자자 이름"
          value={investorName}
          onChange={investorNameChange}
          type={"text"}
          id={investorName}
          placeholder="투자자 이름을 입력해주세요"
          error={investorNameError}
        />
        <InputBox
          label="투자 금액"
          value={amount}
          onChange={amountChange}
          type={"number"}
          id={amount}
          placeholder="투자 금액을 입력해 주세요"
          error={amountError}
        />
        <InputBox
          label="투자 코멘트"
          value={comment}
          onChange={commentChange}
          type={"text"}
          id={comment}
          placeholder="투자에 대한 코멘트를 입력해 주세요"
          error={commentError}
        />
        <InputBox
          label="비밀번호"
          value={password}
          onChange={handlePasswordChange}
          type={"password"}
          id={password}
          placeholder="비밀번호를 입력해주세요"
          error={passwordError}
        />
        <InputBox
          label="비밀번호 확인"
          value={checkPassword}
          onChange={handleCheckPasswordChange}
          type={"password"}
          id={checkPassword}
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
          error={passwordError}
        />
      </div>
      <div>
        <button type="button">취소</button>
        <button type="submit">투자하기</button>
      </div>
    </form>
  );
}

export default InvestmentForm;
