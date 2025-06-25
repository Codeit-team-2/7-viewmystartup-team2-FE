// src/pages/InvestmentOverviewPage/InvestmentOverviewPage.jsx
import { useEffect, useState } from "react";
import FetchTable from "../../components/FetchTable/FetchTable.jsx";
import NoResult from "../../components/SearchBar/NoResult.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import PageSizeSelector from "../../components/PageSizeSelector/PageSizeSelector.jsx";
import PaginationBtn from "../../components/DetailCompany/PaginationBtn.jsx";
import SelectOption from "../../components/SelectOption/selectOption.jsx";
import { useSearchFilter } from "../../hooks/useSearchFilter.js";
import { usePagination } from "../../hooks/usePagination.js";
import { usePageSize } from "../../hooks/usePageSize.js";
import { fetchInvestmentOverviewData } from "../../api/company.js";
import { InvestmentOverviewPageOptionsData } from "../../config/filterConfig.js"; // 정렬 옵션
import styles from "./InvestmentOverviewPage.module.css";
import { matchingInvestmentUserList } from "../../api/company.js";
import {
  formatFromBillion,
  formatFromTrillionFloat,
} from "../../utils/formatCurrency.js";

//나중에 config로 뺍시당
const InvestmentOverviewPageColumns = [
  { label: "순위", key: "rank" },
  { label: "기업명", key: "companyName" },
  { label: "기업 소개", key: "description" },
  { label: "카테고리", key: "category" },
  { label: "View My Startup 투자금액", key: "vmsInvestment" },
  { label: "누적 투자 금액", key: "totalInvestment" },
];

export default function InvestmentOverviewPage() {
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

  // pageSize, keyword 바뀌면 page를 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [pageSize, keyword, sortOption]);

  //
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchInvestmentOverviewData(keyword, sortBy, order);
  //     setCompanies(data);
  //   };
  //   fetchData();
  // }, [keyword, sortBy, order]);
  //
  // 위에 있는 useEffect가 현재 대충 sort기능있으면서 백엔드불러오는거같음 내가 원하는건 내api로 새로가져와야됨
  //

  //우진요청사항
  //아래 로컬스토리지에서 나온 userId, nickname context에 저장된 userId, nickname으로 바꾸면 좋을거같아요
  //말씀주시면 제가 바꿈
  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      const nickname = localStorage.getItem("nickname");

      const data = await matchingInvestmentUserList({
        userId,
        nickname,
        sortBy,
        order,
        keyword,
      });
      console.log("🔥 raw API data:", data);
      const formattedData = data.map((item, idx) => ({
        rank: idx + 1,
        companyName: item.company?.companyName || "-",
        description: item.comment || "-",
        category: item.company?.category || "-",
        vmsInvestment: formatFromBillion(item.howMuch || 0),
        totalInvestment: formatFromTrillionFloat(
          item.company.totalInvestment || 0
        ),
      }));
      setCompanies(formattedData);
    };

    fetchData();
  }, [sortOption, pageSize, keyword]);
  //

  const handleCompanySortChange = (e) => {
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
        <div className={styles.tableNav}>
          <div className={styles.tableNavLeft}>
            <h2 className={styles.tableTitle}>투자 현황</h2>
          </div>
          <div className={styles.tableNavRight}>
            <SearchBar onSubmit={search} />
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
        <div className={styles.tableSize}>
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
        </div>
      </div>
    </div>
  );
}
