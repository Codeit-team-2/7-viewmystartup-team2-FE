// src/pages/LandingPage/LandingPage.jsx
import FetchTable from "../../components/FetchTable/FetchTable.jsx";
import { invInitialData } from "../../config/invInitialData_v2";

const columns = [
  { label: "순위", key: "rank" },
  { label: "기업명", key: "companyName" },
  { label: "기업 소개", key: "description" },
  { label: "카테고리", key: "category" },
  { label: "누적 투자 금액", key: "totalInvestment" },
  { label: "매출액", key: "revenue" },
  { label: "고용 인원", key: "employees" },
];

export default function LandingPage() {
  return (
    <div className="startup-page">
      <h2>전체 스타트업 목록</h2>
      <FetchTable data={invInitialData} columns={columns} />
    </div>
  );
}
