import React from "react";

function InvestorDeleteInput({
  password,
  setPassword,
  onConfirm,
  onCancel,
  errorMessage,
}) {
  return (
    <div>
      <input
        type="password"
        placeholder="패스워드를 입력해주세요"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {errorMessage && <div>{errorMessage}</div>}
      <button onClick={onCancel}>취소</button>
      <button onClick={onConfirm}>삭제하기</button>
    </div>
  );
}

export default InvestorDeleteInput;
