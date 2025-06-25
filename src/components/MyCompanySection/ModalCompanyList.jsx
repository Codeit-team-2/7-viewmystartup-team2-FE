import ModalCompanyListItem from "./ModalCompanyListItem";
import React, { useState } from "react";
import styles from "./ModalCompanyList.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function ModalCompanyList({ companies = [], type, page, pageSize, loading }) {
  const start = (page - 1) * pageSize;
  const modalCompanies = companies.slice(start, start + pageSize);

  return (
    <div className={styles.listBox}>
      <p className={styles.title}>검색 결과</p>
      <ul className={styles.companyList}>
        {loading && <LoadingSpinner />}
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
