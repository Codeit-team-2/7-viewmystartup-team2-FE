// src/pages/SelectedOverviewPage/SelectedOverviewPage.jsx
import FetchTable from "../../components/FetchTable/FetchTable.jsx";
import NoResult from "../../components/SearchBar/NoResult.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { invInitialData } from "../../config/invInitialData_mock_80_with_description.js";
import { useSearchFilter } from "../../hooks/useSearchFilter.js";
import { useEffect, useState } from "react";
import { usePagination } from "../../hooks/usePagination.js";
import { usePageSize } from "../../hooks/usePageSize.js";

import PaginationBtn from "../../components/DetailCompany/PaginationBtn.jsx";
import PageSizeSelector from "../../components/PageSizeSelector/PageSizeSelector.jsx";

//나중에 config로 뺍시당
const SelectedOverviewPageColumns = [
  { label: "순위", key: "rank" },
  { label: "기업명", key: "companyName" },
  { label: "기업 소개", key: "description" },
  { label: "카테고리", key: "category" },
  { label: "나의 기업 선택 횟수", key: "myCompanySelectedCount" },
  { label: "비교 기업 선택 횟수", key: "compareSelectedCount" },
];

export default function SelectedOverviewPage() {
  const { keyword, filteredData, search } = useSearchFilter(invInitialData);

  const totalCount = filteredData.length;
  const [page, setPage] = useState(1);
  
  const { pageSize, pageSizeOptions, handlePageSizeChange } = usePageSize(5);
  const { pageNumbers, hasPrev, hasNext, totalPages, handlePageChange } =
    usePagination({
      page,
      setPage,
      totalCount,
      pageSize,
    });

  // pageSize, keyword 바뀌면 page를 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [pageSize, keyword]);

  //현재 페이지의 데이터만 자르기 //요부분은 calculatePageIndex 함수로 따로 빼도될듯
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="startup-page">
      <div>
        <h2>비교 현황</h2>
        <SearchBar onSubmit={search} />
        <PageSizeSelector
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onChange={handlePageSizeChange}
        />
        <h3>필터 selector 컴포넌트 (ex. 누적투자금액 높은순) </h3>

        {/* 필터 OrderBy 선택 영역 */}
      </div>
      {/* <FetchTable data={invInitialData} columns={LandingPageColumns} /> */}
      {/* <FetchTable data={filteredData} columns={LandingPageColumns} /> */}

      {currentPageData.length > 0 ? (
        <>
          {/* <FetchTable data={filteredData} columns={LandingPageColumns} /> */}
          <FetchTable
            data={currentPageData}
            columns={SelectedOverviewPageColumns}
            startIndex={startIndex}
          />
          <PaginationBtn
            page={page}
            pageNumbers={pageNumbers}
            hasPrev={hasPrev}
            hasNext={hasNext}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        <NoResult keyword={keyword} />
      )}
    </div>
  );
}
