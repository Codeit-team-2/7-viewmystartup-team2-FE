import ModalCompanyListItem from "./ModalCompanyListItem";
import React from "react";

function ModalCompanyList({ name, companies = [], type, page, pageSize }) {
  const recentCount = 3;
  let listTitle = "";
  let modalCompanies = [];

  if (page) {
    const start = (page - 1) * pageSize;
    modalCompanies = companies.slice(start, start + pageSize);
  }

  switch (name) {
    case "recent":
      listTitle = `최근 비교한 기업 (${recentCount})`;
      modalCompanies = companies;
      break;
    case "search":
      listTitle = "검색 결과";

      break;
    case "selected":
      listTitle = "선택한 기업";
      modalCompanies = companies;
      break;
  }

  return (
    <div>
      <p>{listTitle}</p>
      <ul className="companyList">
        {modalCompanies.map((company) => (
          <ModalCompanyListItem
            key={company.id}
            company={company}
            type={type}
          />
        ))}
      </ul>
    </div>
  );
}

export default ModalCompanyList;
