import { useState } from "react";
import { updateInvestment } from "../../api/api.js";
import { useParams } from "react-router-dom";
import { DetailCompanyTitle } from "../../components/DetailCompany/DetailCompanyTitle.jsx";
import { DetailCompanyList } from "../../components/DetailCompany/DetailCompanyList.jsx";
import { DetailCompanyInfor } from "../../components/DetailCompany/DetailCompanyInfor.jsx";
import InvestmentForm from "../../components/InvestmentForm/InvestmentForm.jsx";
import InvestorTable from "../../components/DetailCompany/InvestorTable.jsx";
import { usePagination } from "../../hooks/usePagination.js";
import PaginationBtn from "../../components/PaginationBtn/PaginationBtn.jsx";
import CustomButton from "../../components/CustomButton/customButton.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import styles from "./CompanyDetailPage.module.css";
import btnStyle from "../../components/CustomButton/customButton.module.css";
import cat from "../../assets/cat.json";
import Lottie from "lottie-react";
import { useAuth } from "../../components/Contexts/AuthContext.jsx";
import { useCompanyDetail } from "../../hooks/useCompanyDetail.js";

const PAGE_SIZE = 5;

function CompanyDetailPage() {
  const { companyId } = useParams();
  const { company, investors, setInvestors } = useCompanyDetail(companyId);
  const [page, setPage] = useState(1);
  const { pageNumbers, hasPrev, hasNext, handlePageChange } = usePagination({
    page,
    setPage,
    totalCount: investors.length,
    pageSize: PAGE_SIZE,
  });
  const paginatedInvestors = investors.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // 투자자 삭제&수정
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
    }
  };

  // 모달 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("form");
  const [modalMessage, setModalMessage] = useState("투자가 완료되었어요!");
  const [loginCheckModal, setLoginCheckModal] = useState(false); //로그인 체크
  const { isLoggedIn } = useAuth(); //로그인 체크

  const handleOpenModal = () => {
    if (!isLoggedIn) {
      setLoginCheckModal(true);
      return;
    }
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
  if (!company)
    return (
      <div className={styles.catArea}>
        <Lottie
          style={{ width: 500, height: 500 }}
          animationData={cat}
          loop={true}
          autoplay={true}
        />
      </div>
    );

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
        pageSize={PAGE_SIZE}
      />
      <PaginationBtn
        page={page}
        pageNumbers={pageNumbers}
        hasPrev={hasPrev}
        hasNext={hasNext}
        handlePageChange={handlePageChange}
      />
      {loginCheckModal && (
        <Modal onClose={() => setLoginCheckModal(false)} size="small">
          <div className={styles.loginModal}>
            <p className={styles.loginText}>로그인 후 이용 가능합니다</p>
            <CustomButton
              buttonClass={btnStyle.buttonLarge}
              onClick={() => setLoginCheckModal(false)}
            >
              확인
            </CustomButton>
          </div>
        </Modal>
      )}
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
