// src/pages/SelectedOverviewPage/SelectedOverviewPage.jsx
import FetchTable from "../../components/FetchTable/FetchTable.jsx";
import NoResult from "../../components/SearchBar/NoResult.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import { invInitialData } from "../../config/invInitialData_mock_80_with_description.js";
import { useSearchFilter } from "../../hooks/useSearchFilter.js";
import { useEffect, useState } from "react";
import { usePagination } from "../../hooks/usePagination.js";
import { usePageSize } from "../../hooks/usePageSize.js";

import SelectOption from "../../components/SelectOption/selectOption.jsx";
import PaginationBtn from "../../components/DetailCompany/PaginationBtn.jsx";
import PageSizeSelector from "../../components/PageSizeSelector/PageSizeSelector.jsx";
import { fetchSelectedOverviewData } from "../../api/company.js";
import { SelectedOverviewPageOptionsData } from "../../config/filterConfig.js";
import styles from "./SelectedOverviewPage.module.css";

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
  const [sortOption, setSortOption] = useState("myCompanySelectedCount_desc");
  const [sortBy, order] = sortOption.split("_");
  const { keyword, search } = useSearchFilter();
  const [companies, setCompanies] = useState([]);

  const totalCount = companies.length;
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
  }, [pageSize, keyword, sortOption]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSelectedOverviewData(keyword, sortBy, order);
        setCompanies(data);
      } catch (error) {
        console.error("❌ 데이터 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [keyword, sortBy, order]);

  const handleCompanySortChange = (e) => {
    setSortOption(e.target.value);
  };
  //현재 페이지의 데이터만 자르기 //요부분은 calculatePageIndex 함수로 따로 빼도될듯
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = companies.slice(startIndex, endIndex);

  return (
    <div className={styles.startupPage}>
      <div>
        <div className={styles.tableNav}>
          <div className={styles.tableNavLeft}>
            <h2 className={styles.tableTitle}>비교 현황</h2>
          </div>
          <div className={styles.tableNavRight}>
            <SearchBar onSubmit={search} />
            <PageSizeSelector
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              onChange={handlePageSizeChange}
            />
            <SelectOption
              options={SelectedOverviewPageOptionsData}
              onChange={handleCompanySortChange}
            />
          </div>
        </div>
        <div className={styles.tableSize}>
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
      </div>
    </div>
  );
}
