// src/api/investment.js
export async function postInvestment(formData) {
  const response = await fetch("http://localhost:3000/investments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "서버 오류로 인해 투자 요청에 실패했습니다.");
  }

  return data;
}
