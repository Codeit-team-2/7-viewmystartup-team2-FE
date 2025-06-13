// src/pages/LandingPage/LandingPage.jsx
import FetchTable from "../../components/FetchTable/FetchTable.jsx";
import NoResult from "../../components/SearchBar/NoResult.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { invInitialData } from "../../config/invInitialData_v2";
import { useSearchFilter } from "../../hooks/useSearchFilter.js";

//나중에 config로 뺍시당
const LandingPageColumns = [
  { label: "순위", key: "rank" },
  { label: "기업명", key: "companyName" },
  { label: "기업 소개", key: "description" },
  { label: "카테고리", key: "category" },
  { label: "누적 투자 금액", key: "totalInvestment" },
  { label: "매출액", key: "revenue" },
  { label: "고용 인원", key: "employees" },
];

export default function LandingPage() {
  const { keyword, filteredData, search } = useSearchFilter(invInitialData);
  return (
    <div className="startup-page">
      <div>
        <h2>전체 스타트업 목록</h2>
        <SearchBar onSubmit={search} />
        {/* 필터 OrderBy 선택 영역 */}
      </div>
      {/* <FetchTable data={invInitialData} columns={LandingPageColumns} /> */}
      {/* <FetchTable data={filteredData} columns={LandingPageColumns} /> */}

      {filteredData.length > 0 ? (
        <FetchTable data={filteredData} columns={LandingPageColumns} />
      ) : (
        <NoResult keyword={keyword} />
      )}
    </div>
  );
}
