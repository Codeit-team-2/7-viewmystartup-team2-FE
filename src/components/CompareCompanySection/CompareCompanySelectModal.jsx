import { useState } from "react";
import IcDelete from "../../assets/ic_delete.svg";
import MainLogo from "../../assets/main_logo.svg";
import ModalCompanyList from "../MyCompanySection/ModalCompanyList";

function getCompanies({ keyword }) {
  return;
}

function CompareCompanySelectModal({ name, listName, onCompany, onModal }) {
  const [searchValue, setSearchValue] = useState("");

  // const items = () => {
  //   getCompanies({ searchValue });
  // };

  const modalTitle =
    name === "myCompany" ? "나의 기업 선택하기" : "비교할 기업 선택하기";

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
          <p>{modalTitle}</p>
          <img
            className="modalCloseBtn"
            src={IcDelete}
            alt="모달 닫기 버튼"
            onClick={onClickModalClose}
          />
        </div>
        {/* <SearchBar /> */}
        <ModalCompanyList
          name={listName[0]}
          companies={exCompanies}
          type={"compareCompany"}
        />
        <ModalCompanyList
          name={listName[1]}
          companies={exCompanies}
          type={"compareCompany"}
        />
        {/* <Pagenation /> */}
      </div>
    </div>
  );
}

export default CompareCompanySelectModal;
