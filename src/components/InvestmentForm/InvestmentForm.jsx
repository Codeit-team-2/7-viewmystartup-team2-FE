import React, { useState } from "react";
import { DetailCompanyTitle } from "../DetailCompany/DetailCompanyTitle";
import { InputBox } from "./InputBox";
import CustomButton from "../customTag/customButton/customButton";
import { useInvestmentForm } from "./useInvestmentForm";
import styles from "./InvestmentForm.module.css";
import titleStyle from "../DetailCompany//DetailCompanyTitle.module.css";
import btnStyle from "../customTag/customButton/customButton.module.css";

function InvestmentForm({ company = {}, onCancel, onConfirm }) {
  const {
    form, // { investorName, amount, comment, password, checkPassword }
    errors, // { investorNameError, amountError, ... }
    handleChange, // 공통 change handler
    validate, // 유효성 검사
    resetForm, // 초기화
  } = useInvestmentForm();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const companyName = company.companyName || "AI 스타트업"; // 일단 컴퍼니이름이 없어서 임시로 넣어봄
    // 현재 테스트유저 , 비밀번호 123456 을 치고 입력하면 제대로 post가 보내진다. db에도 데이터가 쌓임
    // 여기서 지금 post 요청에따라 만들어야할거같음 일단 컴퍼니이름은 처음에 로컬스토리지에있는 선택한 기업을가져오고
    // 그다음은 유저는 아직 미구현이지만 대충 고정으로 떄려박고
    // 그리고 보낼값인 투자 코멘트 , 투자금액 , 회사 id값 , userid값 이면 충분할듯? 그리고 password는 일치했을경우 보내지잖아?
    // 그럼 처음에 userid와 password검증을해서 틀렸으면 post => create하지말고 바로 리턴
    try {
      await fetch("http://localhost:3000/investments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: "76ad92a4-8b3a-4174-a578-a3e49b82f459", // 일단 임시유저 id값을 넣어봄
          companyId: "1849ef99-ce9f-4718-91e5-0f3b2c33875b", // 여기서 id값과 유저 id값만 보내면 정상적으로 db에 쌓임
          howMuch: Number(form.amount),
          comment: form.comment,
          password: form.password,
        }),
      });
      resetForm();
      alert("투자 완료!");
    } catch (err) {
      console.error("투자 실패", err);
    }
  };

  return (
    <form className={styles.backgroundColor} onSubmit={handleSubmit}>
      <h1 className={styles.titlefont}>투자 기업 정보</h1>
      <DetailCompanyTitle
        company={company}
        areaClass={titleStyle.areaForm}
        imgClass={titleStyle.imgForm}
        boxClass={titleStyle.boxForm}
        titleClass={titleStyle.titleForm}
        categoryClass={titleStyle.categoryForm}
      />

      <InputBox
        label="투자자 이름"
        value={form.investorName}
        onChange={(e) => handleChange("investorName", e.target.value)}
        type="text"
        error={errors.investorName}
      />
      <InputBox
        label="투자 금액"
        value={form.amount}
        onChange={(e) => handleChange("amount", e.target.value)}
        type="number"
        error={errors.amount}
      />
      <InputBox
        label="투자 코멘트"
        value={form.comment}
        onChange={(e) => handleChange("comment", e.target.value)}
        type="text"
        error={errors.comment}
      />
      <InputBox
        label="비밀번호"
        value={form.password}
        onChange={(e) => handleChange("password", e.target.value)}
        type="password"
        error={errors.password}
      />
      <InputBox
        label="비밀번호 확인"
        value={form.checkPassword}
        onChange={(e) => handleChange("checkPassword", e.target.value)}
        type="password"
        error={errors.checkPassword}
      />

      <div className={styles.btnArea}>
        <CustomButton
          buttonClass={btnStyle.buttonCancel}
          onClick={onCancel}
          type="button"
        >
          취소
        </CustomButton>
        <CustomButton buttonClass={btnStyle.buttonLarge} type="submit">
          투자하기
        </CustomButton>
      </div>
    </form>
  );
}

export default InvestmentForm;
