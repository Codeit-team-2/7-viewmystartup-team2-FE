export const resultOptionsData = [
  { value: "investment_desc", label: "누적 투자금액 높은순" },
  { value: "investment_asc", label: "누적 투자금액 낮은순" },
  { value: "revenue_desc", label: "매출액 높은순" },
  { value: "revenue_asc", label: "매출액 낮은순" },
  { value: "employment_desc", label: "고용 인원 높은순" },
  { value: "employment_asc", label: "고용 인원 낮은순" },
];

//LandingPage 전체기업페이지 필터
export const LandingPageOptionsData = [
  { value: "totalInvestment_desc", label: "누적 투자금액 높은순" },
  { value: "totalInvestment_asc", label: "누적 투자금액 낮은순" },
  { value: "revenue_desc", label: "매출액 높은순" },
  { value: "revenue_asc", label: "매출액 낮은순" },
  { value: "employees_desc", label: "고용 인원 높은순" },
  { value: "employees_asc", label: "고용 인원 낮은순" },
];

//InvestmentOverviewPage 투자현황페이지 필터
export const InvestmentOverviewPageOptionsData = [
  { value: "vmsInvestment_desc", label: "VMS 투자금액 높은순" },
  { value: "vmsInvestment_asc", label: "VMS 투자금액 낮은순" },
  { value: "totalInvestment_desc", label: "실제 누적 투자금액 높은순" },
  { value: "totalInvestment_asc", label: "실제 누적 투자금액 낮은순" },
];
//SelectedOverviewPage 비교현황페이지 필터
export const SelectedOverviewPageOptionsData = [
  { value: "myCompanySelectedCount_desc", label: "나의 기업 선택 횟수 높은순" },
  { value: "myCompanySelectedCount_asc", label: "나의 기업 선택 횟수 낮은순" },
  {
    value: "compareSelectedCount_desc",
    label: "비교 기업 선택 횟수 높은순",
  },
  {
    value: "compareSelectedCount_asc",
    label: "비교 기업 선택 횟수 낮은순",
  },
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
