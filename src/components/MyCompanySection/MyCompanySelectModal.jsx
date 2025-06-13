import { useState } from "react";
import IcDelete from "../../assets/ic_delete.svg";
import ModalCompanyList from "./ModalCompanyList";

function getCompanies({ keyword }) {
  return;
}

function MyCompanySelectModal({ onCompany, onModal }) {
  const [searchValue, setSearchValue] = useState("");

  const items = () => {
    getCompanies({ searchValue });
  };

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
        {/* <ModalCompanyList name="최근 선택한 기업" companies={items} /> */}
        {/* <Pagenation /> */}
      </div>
    </div>
  );
}

export default MyCompanySelectModal;
