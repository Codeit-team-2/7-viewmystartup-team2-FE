import React from "react";
import CustomButton from "../customTag/customButton/customButton";
import { InputBox } from "../InvestmentForm/InputBox";
import styles from "./InvestorInput.module.css";
import btnStyle from "../customTag/customButton/customButton.module.css";
function InvestorEditInput({
  password,
  setPassword,
  onConfirm,
  onCancel,
  errorMessage,
}) {
  return (
    <div className={styles.area}>
      <InputBox
        label="비밀번호"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={errorMessage}
        placeholder="패스워드를 입력해주세요"
      />
      <div className={styles.btnArea}>
        <CustomButton buttonClass={btnStyle.buttonCancel} onClick={onCancel}>
          취소
        </CustomButton>
        <CustomButton buttonClass={btnStyle.buttonLarge} onClick={onConfirm}>
          수정하기
        </CustomButton>
      </div>
    </div>
  );
}

export default InvestorEditInput;
