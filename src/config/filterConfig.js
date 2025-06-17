export const resultOptionsData = [
  { value: "investment_desc", label: "누적 투자금액 높은순" },
  { value: "investment_asc", label: "누적 투자금액 낮은순" },
  { value: "revenue_desc", label: "매출액 높은순" },
  { value: "revenue_asc", label: "매출액 낮은순" },
  { value: "employment_desc", label: "고용 인원 높은순" },
  { value: "employment_asc", label: "고용 인원 낮은순" },
];
export const sortFunctions = {
  investment_desc: (a, b) =>
    parseFloat(b.totalInvestment) - parseFloat(a.totalInvestment),
  investment_asc: (a, b) =>
    parseFloat(a.totalInvestment) - parseFloat(b.totalInvestment),
  revenue_desc: (a, b) => parseFloat(b.revenue) - parseFloat(a.revenue),
  revenue_asc: (a, b) => parseFloat(a.revenue) - parseFloat(b.revenue),
  employment_desc: (a, b) => parseFloat(b.employees) - parseFloat(a.employees),
  employment_asc: (a, b) => parseFloat(a.employees) - parseFloat(b.employees),
};
