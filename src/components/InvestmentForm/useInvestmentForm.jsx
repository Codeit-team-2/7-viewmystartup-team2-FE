import { useState } from "react";
export function useInvestmentForm() {
  //우진수정
  const nickname =
    localStorage.getItem("nickname") ||
    `익명사용자${new Date()
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(4, 14)}`;
  //익명사용자+현재시간초단위(MMDDHHmmss) 익명사용자 0622184547
  const userId = localStorage.getItem("userId") || "UnidentifiedID";
  //useContext 래퍼로 감ㅏㅓ 로컬스토리지 쓰ㄴㅣ 안ㅡㅡㄴ지 모게
  // 유저id 를 body가 아니라 header
  // //autorization이라는 키로 담아라 - 안전위해서

  //우진수정
  const [form, setForm] = useState({
    userId,
    investorName: nickname,
    amount: "",
    comment: "",
    password: "",
    checkPassword: "",
  });

  //기존코드
  // const [form, setForm] = useState({
  //   //userId: "", //우진수정
  //   investorName: "",
  //   amount: "",
  //   comment: "",
  //   password: "",
  //   checkPassword: "",
  // });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.investorName.trim())
      newErrors.investorName = "필수 입력 항목입니다.";
    else if (form.investorName.length > 5)
      newErrors.investorName = "5자 이내로 입력해주세요";

    if (!form.amount.trim()) newErrors.amount = "필수 입력 항목입니다.";
    else if (isNaN(form.amount)) newErrors.amount = "숫자로 입력해주세요";

    if (!form.comment.trim()) newErrors.comment = "필수 입력 항목입니다.";
    else if (form.comment.length > 40)
      newErrors.comment = "40자 이내로 입력해주세요";

    if (!form.password) newErrors.password = "비밀번호를 입력해주세요.";
    if (form.password !== form.checkPassword)
      newErrors.checkPassword = "비밀번호가 일치하지 않습니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //우진수정
  const resetForm = () => {
    setForm(prev => ({
      ...prev,
      amount: "",
      comment: "",
      password: "",
      checkPassword: "",
    }));
    setErrors({});
  };

  //기존코드
  // const resetForm = () => {
  //   setForm({
  //     investorName: "", //우진수정 - 나중에 요기는 빼야할듯여 닉네임으로 고정해두고요
  //     amount: "",
  //     comment: "",
  //     password: "",
  //     checkPassword: "",
  //   });
  //   setErrors({});
  // };

  return { form, errors, handleChange, validate, resetForm };
}
