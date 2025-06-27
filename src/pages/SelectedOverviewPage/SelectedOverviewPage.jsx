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
import PaginationBtn from "../../components/PaginationBtn/PaginationBtn.jsx";
import PageSizeSelector from "../../components/PageSizeSelector/PageSizeSelector.jsx";
import { fetchSelectedOverviewData } from "../../api/company.js";
import { SelectedOverviewPageOptionsData } from "../../config/filterConfig.js";
import styles from "./SelectedOverviewPage.module.css";
import { useFetchLoading } from "../../hooks/useFetchLoading.js";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import SkeletonTable from "../../components/Skeletons/SkeletonTable.jsx";
import { SelectedOverviewPageColumns } from "../../config/columnsConfig.js";
import { getCurrentPageData } from "../../utils/getCurrentPageData.js";

export default function SelectedOverviewPage() {
  const { isFetchLoading, startFetchLoading, endFetchLoading } =
    useFetchLoading();
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

  const { currentPageData, startIndex } = getCurrentPageData(
    companies,
    page,
    pageSize
  );

  useEffect(() => {
    setPage(1);
  }, [pageSize, keyword, sortOption]);

  useEffect(() => {
    const fetchData = async () => {
      startFetchLoading();
      try {
        const data = await fetchSelectedOverviewData(keyword, sortBy, order);
        setCompanies(data);
      } catch (error) {
        console.error("❌ 데이터 불러오기 실패:", error);
      } finally {
        endFetchLoading();
      }
    };
    fetchData();
  }, [keyword, sortBy, order]);

  const handleCompanySortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className={styles.startupPage}>
      <div className={styles.tablebox}>
        <div className={styles.tableNav}>
          <div className={styles.tableNavLeft}>
            <h2 className={styles.tableTitle}>비교 현황</h2>
          </div>
          <div className={styles.tableNavRight}>
            <SearchBar inputClassName={styles.customInput} onSubmit={search} />
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
          {isFetchLoading ? (
            <>
              <LoadingSpinner />
              <SkeletonTable />
            </>
          ) : currentPageData.length > 0 ? (
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
