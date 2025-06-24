import React, { useEffect, useState } from "react";
import {
  fetchCompanyDetailData,
  fetchCompanyInvestorsData,
} from "../../api/api.jsx";
import { useParams } from "react-router-dom";
import { DetailCompanyTitle } from "../../components/DetailCompany/DetailCompanyTitle.jsx";
import { DetailCompanyList } from "../../components/DetailCompany/DetailCompanyList.jsx";
import { DetailCompanyInfor } from "../../components/DetailCompany/DetailCompanyInfor.jsx";
import InvestmentForm from "../../components/InvestmentForm/InvestmentForm.jsx";
import InvestorTable from "../../components/DetailCompany/InvestorTable.jsx";
import { usePagination } from "../../hooks/usePagination.js";
import PaginationBtn from "../../components/DetailCompany/PaginationBtn.jsx";
import CustomButton from "../../components/customTag/customButton/customButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import styles from "./CompanyDetailPage.module.css";

function CompanyDetailPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [investors, setInvestors] = useState([]);
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const totalCount = investors.length;

  useEffect(() => {
    fetchCompanyDetailData(id).then(setCompany);
    fetchCompanyInvestorsData(id).then(setInvestors);
  }, [id]);

  const { pageNumbers, hasPrev, hasNext, handlePageChange } = usePagination({
    page,
    setPage,
    totalCount,
    pageSize,
  });
  const paginatedInvestors = investors.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleDeleteInvestor = investor => {
    setInvestors(prev => prev.filter(inv => inv.id !== investor.id));
  };

  const handleEditInvestor = (investor, updated) => {
    setInvestors(prev =>
      prev.map(inv => (inv.id === investor.id ? { ...inv, ...updated } : inv))
    );
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const totalInvestment = investors.reduce(
    (acc, cur) => acc + (cur.howMuch || 0),
    0
  );
  if (!company) return <div>Loading...</div>;
  return (
    <div className={styles.area}>
      <div>
        <DetailCompanyTitle company={company} />
        <DetailCompanyList company={company} />
        <DetailCompanyInfor company={company} />
      </div>
      <div className={styles.titleArea}>
        <h1 className={styles.title}>View My Startup에서 받은 투자</h1>
        <CustomButton onClick={handleOpenModal}>기업투자하기</CustomButton>
      </div>
      <div className={styles.amount}>
        총 {totalInvestment.toLocaleString()}억 원
      </div>
      <InvestorTable
        companyId={company.id}
        company={company}
        investors={paginatedInvestors}
        onDelete={handleDeleteInvestor}
        onEdit={handleEditInvestor}
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
      {modalOpen && (
        <Modal onClose={handleCloseModal}>
          <InvestmentForm company={company} />
        </Modal>
      )}
    </div>
  );
}

export default CompanyDetailPage;
