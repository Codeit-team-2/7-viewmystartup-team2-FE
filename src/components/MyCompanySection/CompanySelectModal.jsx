import { useEffect, useState } from "react";
import IcDelete from "../../assets/ic_delete.svg";
import ModalCompanyList from "./ModalCompanyList";
import MainLogo from "../../assets/main_logo.svg";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import PaginationBtn from "../DetailCompany/PaginationBtn";
import { useSearchFilter } from "../../hooks/useSearchFilter";
import { data } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import { fetchFilteredData } from "../../api/api";

function CompanySelectModal({ type, listName, onModal }) {
  const [companies, setCompanies] = useState([]);
  const { keyword, search } = useSearchFilter();

  // keyword = value값 제어
  // search = setKeyword

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFilteredData(keyword);
      setCompanies(data);
    };

    fetchData();
  }, [keyword]);

  const pageSize = 5;
  const [page, setPage] = useState(1);
  const totalCount = companies.length;

  const { pageNumbers, hasPrev, hasNext, handlePageChange } = usePagination({
    page,
    setPage,
    totalCount,
    pageSize,
  });

  const modalTitle =
    type === "myCompany" ? "나의 기업 선택하기" : "비교할 기업 선택하기";

  const exCompanies = [
    {
      companyName: "코드잇",
      category: "에듀테크",
      imgUrl: { MainLogo },
      id: "abc",
    },
  ];

  const onClickModalClose = () => {
    onModal(false);
  };

  return (
    <div className="modalBackground" onClick={onClickModalClose}>
      <div className="selectModal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <p>{modalTitle}</p>
          <img
            className="modalCloseBtn"
            src={IcDelete}
            alt="모달 닫기 버튼"
            onClick={onClickModalClose}
          />
        </div>
        <SearchBar onSubmit={search} />

        <ModalCompanyList
          name={listName[0]}
          companies={exCompanies}
          type={type}
        />
        <ModalCompanyList
          name={listName[1]}
          companies={companies}
          type={type}
          page={page}
          pageSize={pageSize}
        />

        <PaginationBtn
          page={page}
          pageNumbers={pageNumbers}
          hasPrev={hasPrev}
          hasNext={hasNext}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default CompanySelectModal;
