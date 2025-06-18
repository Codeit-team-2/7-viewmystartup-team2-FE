import { useState } from "react";
import IcDelete from "../../assets/ic_delete.svg";
import ModalCompanyList from "./ModalCompanyList";
import MainLogo from "../../assets/main_logo.svg";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import PaginationBtn from "../DetailCompany/PaginationBtn";
import { useSearchFilter } from "../../hooks/useSearchFilter";
import { invInitialData } from "../../config/invInitialData_mock_80_with_description";
import { data } from "react-router-dom";

function getCompanies({ keyword }) {
  return;
}

function CompanySelectModal({ type, listName, onModal }) {
  const { keyword, filteredData, search } = useSearchFilter(invInitialData); // 여기 안에 get으로 가져온 데이터

  // filterdData => 키워드가 포함된 데이터
  // invData 위치에 초기 데이터
  // keyword = value값 제어

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
          companies={filteredData}
          type={type}
        />

        <PaginationBtn
          page={1}
          pageNumbers={[1, 2, 3, 4, 5]}
          hasPrev={false}
          hasNext={true}
          handlePageChange={(x) => console.log(x)}
        />
      </div>
    </div>
  );
}

export default CompanySelectModal;
