import { useState } from "react";
import IcDelete from "../../assets/ic_delete.svg";
import ModalCompanyList from "./ModalCompanyList";
import MainLogo from "../../assets/main_logo.svg";

function getCompanies({ keyword }) {
  return;
}

function MyCompanySelectModal({ onCompany, onModal }) {
  const [searchValue, setSearchValue] = useState("");

  // const items = () => {
  //   getCompanies({ searchValue });
  // };

  const exCompanies = [
    {
      name: "코드잇",
      name2: "에듀테크",
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
        <div>
          <p>나의 기업 선택하기</p>
          <img
            className="modalCloseBtn"
            src={IcDelete}
            alt="모달 닫기 버튼"
            onClick={onClickModalClose}
          />
        </div>
        {/* <SearchBar /> */}
        <ModalCompanyList name={"recent"} companies={exCompanies} />
        <ModalCompanyList name={"search"} companies={exCompanies} />
        {/* <Pagenation /> */}
      </div>
    </div>
  );
}

export default MyCompanySelectModal;
