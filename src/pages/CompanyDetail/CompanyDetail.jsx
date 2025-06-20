import React, { useState } from "react";
import { invInitialData } from "../../config/invInitialData_v2.js";
import { investorsListData } from "../../config/investorsListData.js";
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
import styles from "./CompanyDetail.module.css";

function CompanyDetail() {
  const { id } = useParams();
  const company = invInitialData.find(c => c.id === Number(id));
  const companyId = company.id;
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const totalCount = (investorsListData[companyId] || []).length;

  const { pageNumbers, hasPrev, hasNext, handlePageChange } = usePagination({
    page,
    setPage,
    totalCount,
    pageSize,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
      <div className={styles.amount}> 총 투자금액 나와야합니다</div>
      <InvestorTable
        companyId={companyId}
        company={company}
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

export default CompanyDetail;
