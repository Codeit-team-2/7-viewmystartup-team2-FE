import React, { useState } from "react";
import { DetailCompanyTitle } from "../DetailCompany/DetailCompanyTitle";
import { InputBox } from "./InputBox";
import CustomButton from "../customTag/customButton/customButton";
import { useInvestmentForm } from "./useInvestmentForm";
import styles from "./InvestmentForm.module.css";

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
    try {
      await fetch("http://localhost:3000/investments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          companyName: companyName,
          investorName: form.investorName,
          amount: form.amount,
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
      <DetailCompanyTitle company={company} />

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

      <div className={styles.postButton}>
        <CustomButton onClick={onCancel} type="button">
          취소
        </CustomButton>
        <CustomButton type="submit">투자하기</CustomButton>
      </div>
    </form>
  );
}

export default InvestmentForm;
