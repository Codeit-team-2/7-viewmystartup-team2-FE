import React from "react";

function InvestorEditInput({
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
      <button onClick={onConfirm}>수정하기</button>
    </div>
  );
}

export default InvestorEditInput;
