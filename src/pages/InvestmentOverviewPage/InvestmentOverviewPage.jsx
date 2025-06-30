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
import rainbowcat from "../../assets/catcursor.json";
import Rain from "../../components/animatepopup/Rainbowcat.jsx";
import { getCurrentPageData } from "../../utils/getCurrentPageData.js";

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
  const [userIdCheck, serUserIdCheck] = useState(false);

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
    const storegeUserId = localStorage.getItem("userId");
    serUserIdCheck(!!storegeUserId);
  }, []);

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

  const handleCompanySortChange = (e) => {
    setSortOption(e.target.value);
  };

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      setPosition((prev) => {
        const step = 20;
        switch (e.key) {
          case "ArrowUp":
            return { x: prev.x, y: Math.max(prev.y - step, 0) };
          case "ArrowDown":
            return { x: prev.x, y: prev.y + step };
          case "ArrowLeft":
            return { x: Math.max(prev.x - step, 0), y: prev.y };
          case "ArrowRight":
            return { x: prev.x + step, y: prev.y };
          default:
            return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className={styles.startupPage}>
      <div className={styles.tablebox}>
        <div className={styles.tableSize}>
          {isFetchLoading ? (
            <>
              <LoadingSpinner />
              <SkeletonTable />
            </>
          ) : !userIdCheck ? (
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
              <Rain />
            </div>
          ) : (
            <>
              <div className={styles.tableNav}>
                <div className={styles.tableNavLeft}>
                  <h2 className={styles.tableTitle}>
                    <span className={styles.tableName}>{nickname}</span> 님의
                    투자 내역
                  </h2>
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
              {currentPageData.length > 0 ? (
                <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
