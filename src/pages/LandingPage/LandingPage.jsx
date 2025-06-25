// src/pages/LandingPage/LandingPage.jsx
import React, { useEffect, useState } from "react";
import FetchTable from "../../components/FetchTable/FetchTable.jsx";
import NoResult from "../../components/SearchBar/NoResult.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import PageSizeSelector from "../../components/PageSizeSelector/PageSizeSelector";
import { useSearchFilter } from "../../hooks/useSearchFilter.js";
import { usePagination } from "../../hooks/usePagination.js";
import { usePageSize } from "../../hooks/usePageSize";
import PaginationBtn from "../../components/DetailCompany/PaginationBtn.jsx";
// import { useCompanies } from "../../hooks/useCompanies.js";
import SelectOption from "../../components/SelectOption/selectOption.jsx";
import { LandingPageOptionsData } from "../../config/filterConfig.js";
// import { fetchFilteredData } from "../../api/api.jsx";
import { fetchFilteredDataWJ } from "../../api/company.js";
import styles from "./LandingPage.module.css";
import { formatFromTrillionFloat } from "../../utils/formatCurrency.js";
import SkeletonTable from "../../components/Skeletons/SkeletonTable.jsx";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

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
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("totalInvestment_desc");
  const [sortBy, order] = sortOption.split("_");
  // const { data, loading } = useCompanies({ sortBy, order });
  const { keyword, search } = useSearchFilter();
  const [companies, setCompanies] = useState([]);

  const totalCount = companies.length;
  const [page, setPage] = useState(1);
  // const pageSize = 5; // 한 페이지에 보여줄 항목 수
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
      setLoading(true); // 로딩 시작
      try {
        const data = await fetchFilteredDataWJ(keyword, sortBy, order);
        const formattedData = data.map((item, idx) => ({
          rank: idx + 1,
          companyName: item.companyName,
          description: item.description,
          category: item.category,
          totalInvestment: formatFromTrillionFloat(item.totalInvestment), // 변환 적용
          revenue: formatFromTrillionFloat(item.revenue), // 변환 적용
          employees: item.employees,
        }));
        setCompanies(formattedData);
      } catch (error) {
        console.error("데이터 불러오기 실패", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };
    fetchData();
  }, [keyword, sortBy, order]);

  const handleCompanySortChange = (e) => {
    setSortOption(e.target.value);
    console.log(e.target.value);
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
            <h2 className={styles.tableTitle}>전체 스타트업 목록</h2>
          </div>
          <div className={styles.tableNavRight}>
            <SearchBar onSubmit={search} />
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
            <SkeletonTable rows={pageSize} />
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
