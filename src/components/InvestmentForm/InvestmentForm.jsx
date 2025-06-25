import React, { useState, useEffect, useId } from "react";
import { DetailCompanyTitle } from "../DetailCompany/DetailCompanyTitle";
import { InputBox } from "./InputBox";
import CustomButton from "../customTag/customButton/customButton";
import { useInvestmentForm } from "./useInvestmentForm";
import styles from "./InvestmentForm.module.css";
import titleStyle from "../DetailCompany//DetailCompanyTitle.module.css";
import btnStyle from "../customTag/customButton/customButton.module.css";
import { useAuth } from "../Contexts/AuthContext"; //우진수정
import { postInvestment } from "../../api/investment"; //우진수정
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function InvestmentForm({ company = {}, onCancel, onConfirm }) {
  const [loading, setLoading] = useState(false); //우진수정 - 중복 요청 방지용 로딩 상태
  const { nickname, userId } = useAuth(); // ✅ context로부터 사용자 정보 받기//우진수정

  useEffect(() => {
    if (nickname) handleChange("investorName", nickname);
    if (userId) handleChange("userId", userId);
  }, [nickname, userId]);

  const {
    form, // { investorName, amount, comment, password, checkPassword }
    errors, // { investorNameError, amountError, ... }
    handleChange, // 공통 change handler
    validate, // 유효성 검사
    resetForm, // 초기화
  } = useInvestmentForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //비로그인 상태 투자하기 불가
    if (!userId || userId === "UnidentifiedID") {
      onConfirm?.(false, "로그인이 필요합니다.");
      return;
    }

    //입력 조건 검사
    if (!validate()) return;

    console.log(company);
    console.log("companyId from prop:", company.id);

    //fetch api 이전에 try문 밖에서 setLoading - true 설정
    //finally 추가 후 setLoading - false 설정
    setLoading(true);
    try {
      await postInvestment({
        userId,
        companyId: company.id,
        howMuch: Number(form.amount),
        comment: form.comment,
        password: form.password,
      });

      resetForm(); //모달비우기
      onConfirm?.(true, "투자가 완료되었어요!");
    } catch (err) {
      console.error("투자 실패:", err);
      onConfirm?.(false, `투자실패 - 사유: ${err.message}`);
    } finally {
      setLoading(false); //우진수정 - 로딩종료 이후 아래 커스텀버튼을 로딩상태에 따라 disabled 하게 변경
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

      <div className={styles.emtybox}></div>
      <div className={styles.nicknameDisplay}>
        <p className={styles.info}>투자자 정보</p>
        <div className={styles.nameBox}>
          <p>{nickname || "닉네임없음"}</p>
        </div>
      </div>

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
      {loading && <LoadingSpinner />}
      <div className={styles.btnArea}>
        <CustomButton
          buttonClass={btnStyle.buttonCancel}
          onClick={onCancel}
          type="button"
          disabled={loading} //우진수정 - 로딩중 버튼비활성화
        >
          취소
        </CustomButton>
        <CustomButton
          buttonClass={btnStyle.buttonLarge}
          type="submit"
          disabled={loading} //우진수정 - 로딩중 버튼비활성화
        >
          투자하기
        </CustomButton>
      </div>
    </form>
  );
}

export default InvestmentForm;
