import { useState, useCallback } from "react";

export function usePasswordCheck() {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const passwordErrorText = useCallback((password, checkPassword) => {
    if (password.trim() === "") {
      return "필수 입력 항목입니다.";
    }
    if (password !== checkPassword) {
      return "비밀번호가 일치하지 않습니다.";
    }
    return "";
  }, []);

  const handlePasswordChange = e => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(passwordErrorText(value, checkPassword));
  };
  const handleCheckPasswordChange = e => {
    const value = e.target.value;
    setCheckPassword(value);
    setPasswordError(passwordErrorText(password, value));
  };

  return {
    password,
    checkPassword,
    passwordError,
    handlePasswordChange,
    handleCheckPasswordChange,
  };
}
