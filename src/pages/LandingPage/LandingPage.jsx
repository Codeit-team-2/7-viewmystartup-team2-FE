// src/pages/LandingPage/LandingPage.jsx
import React, { useEffect, useState } from "react";
import FetchTable from "../../components/FetchTable/FetchTable.jsx";
import NoResult from "../../components/SearchBar/NoResult.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import PageSizeSelector from "../../components/PageSizeSelector/PageSizeSelector";
import { useSearchFilter } from "../../hooks/useSearchFilter.js";
import { usePagination } from "../../hooks/usePagination.js";
import { usePageSize } from "../../hooks/usePageSize";
import PaginationBtn from "../../components/PaginationBtn/PaginationBtn.jsx";
import SelectOption from "../../components/SelectOption/selectOption.jsx";
import { LandingPageOptionsData } from "../../config/filterConfig.js";
import { fetchFilteredDataWJ } from "../../api/company.js";
import styles from "./LandingPage.module.css";
import SkeletonTable from "../../components/Skeletons/SkeletonTable.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import { LandingPageColumns } from "../../config/columnsConfig.js";
import { formatCompanyList } from "../../utils/formatCompanyData.js";
import { getCurrentPageData } from "../../utils/getCurrentPageData.js";

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("totalInvestment_desc");
  const [sortBy, order] = sortOption.split("_");
  const { keyword, search } = useSearchFilter();
  const [companies, setCompanies] = useState([]);

  const totalCount = companies.length;
  const [page, setPage] = useState(1);
  const { pageSize, pageSizeOptions, handlePageSizeChange } = usePageSize(5); //pageSize : 한페이지에 보일 항목 수
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

  // pageSize, keyword 바뀌면 page를 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [pageSize, keyword, sortOption]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchFilteredDataWJ(keyword, sortBy, order);
        const formattedData = formatCompanyList(data); //테이블 내 데이터 단위 포매팅
        setCompanies(formattedData);
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [keyword, sortBy, order]);

  const handleCompanySortChange = (e) => {
    setSortOption(e.target.value);
    // console.log(e.target.value);
  };

  //현재 페이지의 데이터만 자르기 //요부분은 calculatePageIndex 함수로 따로 빼도될듯
  // const startIndex = (page - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // const currentPageData = companies.slice(startIndex, endIndex);

  return (
    <div className={styles.startupPage}>
      <div className={styles.tablebox}>
        <div className={styles.tableNav}>
          <div className={styles.tableNavLeft}>
            <h2 className={styles.tableTitle}>전체 스타트업 목록</h2>
          </div>
          <div className={styles.tableNavRight}>
            <SearchBar inputClassName={styles.customInput} onSubmit={search} />
            <PageSizeSelector
              pageSize={pageSize}
              pageSizeOptions={pageSizeOptions}
              onChange={handlePageSizeChange}
            />
            <SelectOption
              options={LandingPageOptionsData}
              onChange={handleCompanySortChange}
            ></SelectOption>{" "}
          </div>
        </div>
        <div className={styles.tableSize}>
          {loading ? (
            <>
              <LoadingSpinner />
              <SkeletonTable rows={pageSize} />
            </>
          ) : // <LoadingSpinner />
          currentPageData.length > 0 ? (
            <>
              <FetchTable
                data={currentPageData}
                columns={LandingPageColumns}
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
