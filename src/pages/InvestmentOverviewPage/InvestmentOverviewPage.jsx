// src/pages/InvestmentOverviewPage/InvestmentOverviewPage.jsx
import { useEffect, useState } from "react";
import FetchTable from "../../components/FetchTable/FetchTable.jsx";
import NoResult from "../../components/SearchBar/NoResult.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import PageSizeSelector from "../../components/PageSizeSelector/PageSizeSelector.jsx";
import PaginationBtn from "../../components/PaginationBtn/PaginationBtn.jsx";
import SelectOption from "../../components/SelectOption/selectOption.jsx";
import { useSearchFilter } from "../../hooks/useSearchFilter.js";
import { usePagination } from "../../hooks/usePagination.js";
import { usePageSize } from "../../hooks/usePageSize.js";
// import { fetchInvestmentOverviewData } from "../../api/company.js";
import { InvestmentOverviewPageOptionsData } from "../../config/filterConfig.js"; // 정렬 옵션
import styles from "./InvestmentOverviewPage.module.css";
import { matchingInvestmentUserList } from "../../api/company.js";
import { useFetchLoading } from "../../hooks/useFetchLoading.js";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import SkeletonTable from "../../components/Skeletons/SkeletonTable.jsx";
import { useAuth } from "../../components/Contexts/AuthContext";
import cat from "../../assets/cat.json";
import Lottie from "lottie-react";
import { InvestmentOverviewPageColumns } from "../../config/columnsConfig.js";
import { formatCompanyList } from "../../utils/formatCompanyData.js";

export default function InvestmentOverviewPage() {
  const { userId, nickname, isLoggedIn } = useAuth();
  const { isFetchLoading, startFetchLoading, endFetchLoading } =
    useFetchLoading();
  const [sortOption, setSortOption] = useState("vmsInvestment_desc");
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

  useEffect(() => {
    setPage(1);
  }, [pageSize, keyword, sortOption]);

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchData = async () => {
      startFetchLoading();
      try {
        const data = await matchingInvestmentUserList({
          userId,
          nickname,
          sortBy,
          order,
          keyword,
        });
        console.log("🔥 raw API data:", data);
        const formattedData = formatCompanyList(data, {
          includeVmsInvestment: true,
          isNestedCompany: true,
        });
        setCompanies(formattedData);
      } catch (error) {
        console.error("투자 현황 데이터 불러오기 실패", error);
      } finally {
        endFetchLoading();
      }
    };

    fetchData();
  }, [isLoggedIn, sortOption, pageSize, keyword]);
  //

  const handleCompanySortChange = e => {
    setSortOption(e.target.value); // 예: vmsInvestment_asc
    console.log(e.target.value);
  };

  //현재 페이지의 데이터만 자르기 //요부분은 calculatePageIndex 함수로 따로 빼도될듯
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = companies.slice(startIndex, endIndex);
  return (
    <div className={styles.startupPage}>
      <div className={styles.tablebox}>
        <div className={styles.tableSize}>
          {isFetchLoading ? (
            <>
              <LoadingSpinner />
              <SkeletonTable />
            </>
          ) : companies.length === 0 ? (
            <div className={styles.catArea}>
              <Lottie
                style={{ width: 200, height: 200 }}
                animationData={cat}
                loop={true}
                autoplay={true}
              />
              <span className={styles.noDataMessage}>
                로그인이 필요한 페이지입니다
              </span>
            </div>
          ) : currentPageData.length > 0 ? (
            <>
              <div className={styles.tableNav}>
                <div className={styles.tableNavLeft}>
                  <h2 className={styles.tableTitle}>투자 현황</h2>
                </div>
                <div className={styles.tableNavRight}>
                  <SearchBar
                    inputClassName={styles.customInput}
                    onSubmit={search}
                  />
                  <PageSizeSelector
                    pageSize={pageSize}
                    pageSizeOptions={pageSizeOptions}
                    onChange={handlePageSizeChange}
                  />
                  <SelectOption
                    options={InvestmentOverviewPageOptionsData}
                    onChange={handleCompanySortChange}
                  />
                </div>
              </div>
              <FetchTable
                data={currentPageData}
                columns={InvestmentOverviewPageColumns}
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
