import { useState } from "react";
export function useInvestmentForm() {
  const [form, setForm] = useState({
    investorName: "",
    amount: "",
    comment: "",
    password: "",
    checkPassword: "",
  });

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
    else if (form.comment.length > 20)
      newErrors.comment = "20자 이내로 입력해주세요";

    if (!form.password) newErrors.password = "비밀번호를 입력해주세요.";
    if (form.password !== form.checkPassword)
      newErrors.checkPassword = "비밀번호가 일치하지 않습니다.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setForm({
      investorName: "",
      amount: "",
      comment: "",
      password: "",
      checkPassword: "",
    });
    setErrors({});
  };

  return { form, errors, handleChange, validate, resetForm };
}
