import React from "react";

export function DetailCompanyList({ company }) {
  return (
    <div>
      <div>누적 투자 금액: {company.totalInvestment}</div>
      <div>매출액: {company.revenue}</div>
      <div>고용 인원: {company.employees}명</div>
    </div>
  );
}
