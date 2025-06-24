import React, { useEffect, useState } from "react";
import {
  fetchCompanyDetailData,
  fetchCompanyInvestorsData,
  updateInvestment,
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
import btnStyle from "../../components/customTag/customButton/customButton.module.css";

function CompanyDetailPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const [investors, setInvestors] = useState([]);
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const totalCount = investors.length;

  useEffect(() => {
    fetchCompanyDetailData(companyId).then(setCompany);
    fetchCompanyInvestorsData(companyId).then(setInvestors);
  }, [companyId]);

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

  const handleEditInvestor = async (investor, updated, password) => {
    try {
      await updateInvestment(investor.id, investor.user.id, password, {
        howMuch: Number(updated.howMuch),
        comment: updated.comment,
      });
      setInvestors(prev =>
        prev.map(inv => (inv.id === investor.id ? { ...inv, ...updated } : inv))
      );
    } catch (e) {
      console.error("수정실패 error:", e);
      alert("수정실패");
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("form");
  const [modalMessage, setModalMessage] = useState("투자가 완료되었어요!");

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalStep("form");
  };

  const handleConfirm = (
    isSuccess = true,
    message = "투자가 완료되었어요!"
  ) => {
    setModalMessage(message);
    setModalStep("confirm");
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
        <Modal
          onClose={handleCloseModal}
          size={modalStep === "confirm" ? "small" : "default"}
        >
          {modalStep === "form" ? (
            <>
              <p className={styles.modalTitle}>기업에 투자하기</p>
              <InvestmentForm
                company={company}
                onConfirm={handleConfirm}
                onCancel={handleCloseModal}
              />
            </>
          ) : (
            <>
              <div className={styles.modalArea}>
                <p className={styles.modalText}>{modalMessage}</p>
                <CustomButton
                  buttonClass={btnStyle.buttonLarge}
                  onClick={() => {
                    handleCloseModal();
                    window.location.reload();
                  }}
                >
                  확인
                </CustomButton>
              </div>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

export default CompanyDetailPage;
