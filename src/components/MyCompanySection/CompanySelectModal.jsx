import { useEffect, useState } from "react";
import IcDelete from "../../assets/ic_delete.svg";
import ModalCompanyList from "./ModalCompanyList";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import PaginationBtn from "../DetailCompany/PaginationBtn";
import { useSearchFilter } from "../../hooks/useSearchFilter";
import { data } from "react-router-dom";
import { usePagination } from "../../hooks/usePagination";
import { fetchFilteredData } from "../../api/api";
import ModalCompanyListRecent from "./ModalCompanyListRecent";
import ModalCompanyListSelected from "./ModalCompanyListSelected";
import styles from "./CompanySelectModal.module.css";

function CompanySelectModal({ type, onModal }) {
  const [companies, setCompanies] = useState([]);
  const { keyword, search } = useSearchFilter();

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

  const onClickModalClose = () => {
    onModal(false);
  };

  return (
    <div className={styles.modalOutside} onClick={onClickModalClose}>
      <div className={styles.selectModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <p className={styles.modalHeaderText}>{modalTitle}</p>
          <img
            className={styles.modalCloseBtn}
            src={IcDelete}
            alt="모달 닫기 버튼"
            onClick={onClickModalClose}
          />
        </div>
        <SearchBar onSubmit={search} />

        {type === "myCompany" && <ModalCompanyListRecent type={type} />}
        {type === "compareCompany" && <ModalCompanyListSelected type={type} />}

        <ModalCompanyList
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

// function CompanySelectModal({ type, listName, onModal }) {
//   const [companies, setCompanies] = useState([]);
//   const { keyword, search } = useSearchFilter();

//   // keyword = value값 제어
//   // search = setKeyword

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchFilteredData(keyword);
//       setCompanies(data);
//     };

//     fetchData();
//   }, [keyword]);

//   const pageSize = 5;
//   const [page, setPage] = useState(1);
//   const totalCount = companies.length;

//   const { pageNumbers, hasPrev, hasNext, handlePageChange } = usePagination({
//     page,
//     setPage,
//     totalCount,
//     pageSize,
//   });

//   const modalTitle =
//     type === "myCompany" ? "나의 기업 선택하기" : "비교할 기업 선택하기";

//   const onClickModalClose = () => {
//     onModal(false);
//   };

//   return (
//     <div className="modalBackground" onClick={onClickModalClose}>
//       <div className="selectModal" onClick={(e) => e.stopPropagation()}>
//         <div className="modalHeader">
//           <p>{modalTitle}</p>
//           <img
//             className="modalCloseBtn"
//             src={IcDelete}
//             alt="모달 닫기 버튼"
//             onClick={onClickModalClose}
//           />
//         </div>
//         <SearchBar onSubmit={search} />

//         <ModalCompanyList name={listName[0]} type={type} />
//         <ModalCompanyList
//           name={listName[1]}
//           companies={companies}
//           type={type}
//           page={page}
//           pageSize={pageSize}
//         />

//         <PaginationBtn
//           page={page}
//           pageNumbers={pageNumbers}
//           hasPrev={hasPrev}
//           hasNext={hasNext}
//           handlePageChange={handlePageChange}
//         />
//       </div>
//     </div>
//   );
// }

// export default CompanySelectModal;
