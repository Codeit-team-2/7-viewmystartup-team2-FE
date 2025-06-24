import React, { useState } from "react";
import InvestorSelectBtn from "./InvestorSelectBtn.jsx";
import Modal from "../Modal/Modal.jsx";
import InvestorDeleteInput from "./InvestorDeleteInput.jsx";
import InvestorEditInput from "./InvestorEditInput.jsx";
import InvestmentEditForm from "../InvestmentForm/InvestmentEditForm.jsx";
import styles from "./InvestorTable.module.css";
import {
  deleteInvestment,
  postPasswordCheck,
  updateInvestment,
} from "../../api/api.jsx";

function InvestorTable({
  investors,
  company,
  page,
  pageSize,
  onDelete,
  onEdit,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editStep, setEditStep] = useState("password");

  const handleAction = (action, investor) => {
    setModalAction(action);
    setSelectedInvestor(investor);
    setModalOpen(true);
    setPassword("");
    setErrorMessage("");
    setEditStep("password");
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalAction("");
    setSelectedInvestor(null);
    setPassword("");
    setErrorMessage("");
    setEditStep("password");
  };

  const handleDelete = async () => {
    try {
      await deleteInvestment(
        selectedInvestor.id,
        selectedInvestor.user.id,
        password
      );
      onDelete && onDelete(selectedInvestor);
      handleModalClose();
    } catch (e) {
      setErrorMessage("비밀번호가 틀렸거나 삭제 권한이 없습니다.");
    }
  };

  const handleEdit = async () => {
    try {
      console.log(
        "handleEdit userId, password:",
        selectedInvestor.user.id,
        password
      );
      await postPasswordCheck(selectedInvestor.user.id, password);
      setEditStep("editForm");
      setErrorMessage("");
    } catch (e) {
      setErrorMessage("비밀번호가 틀렸거나 삭제 권한이 없습니다.");
    }
  };

  const handleEditSubmit = async updatedInvestor => {
    try {
      console.log("updateInvestment 요청 데이터:", {
        investmentId: selectedInvestor.id,
        userId: selectedInvestor.user.id,
        password,
        howMuch: updatedInvestor.howMuch,
        comment: updatedInvestor.comment,
      });
      const result = await updateInvestment(
        selectedInvestor.id,
        selectedInvestor.user.id,
        password,
        {
          howMuch: updatedInvestor.howMuch ?? "",
          comment: updatedInvestor.comment ?? "",
        }
      );
      console.log("updateInvestor 결과:", result);

      if (onEdit) {
        console.log("onEdit 호출", selectedInvestor, updatedInvestor, password);
        onEdit(selectedInvestor, updatedInvestor, password);
      }
      // onEdit && onEdit(selectedInvestor, updatedInvestor);
      console.log("모든 로직 완료");
      handleModalClose();
    } catch (error) {
      console.error("수정 실패 catch 발생:", error);
      setErrorMessage("비밀번호가 틀렸거나 삭제 권한이 없습니다.");
    }
  };

  return (
    <>
      <table className={styles.area}>
        <thead className={styles.title}>
          <tr>
            <th className={styles.sBox}>이름</th>
            <th className={styles.sBox}>순위</th>
            <th className={styles.sBox}>투자금액</th>
            <th className={styles.comment}>투자 코멘트</th>
            <th className={styles.option} />
          </tr>
        </thead>
        <tbody>
          {(investors || []).map(inv => (
            <tr className={styles.content} key={inv.rank}>
              <td className={styles.contentBox}>{inv.user?.nickname}</td>
              <td className={styles.contentBox}>{inv.rank}위</td>
              <td className={styles.contentBox}>{inv.howMuch} 억</td>
              <td className={styles.commentBox}>{inv.comment}</td>
              <td className={styles.optionBox}>
                <InvestorSelectBtn investor={inv} onAction={handleAction} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <Modal onClose={handleModalClose} size="small">
          {modalAction === "delete" ? (
            <InvestorDeleteInput
              password={password}
              setPassword={setPassword}
              onConfirm={handleDelete}
              onCancel={handleModalClose}
              errorMessage={errorMessage}
            />
          ) : modalAction === "edit" ? (
            editStep === "password" ? (
              <InvestorEditInput
                password={password}
                setPassword={setPassword}
                onConfirm={handleEdit}
                onCancel={handleModalClose}
                errorMessage={errorMessage}
              />
            ) : (
              <InvestmentEditForm
                investor={selectedInvestor}
                company={company}
                onConfirm={handleEditSubmit}
                onCancel={handleModalClose}
              />
            )
          ) : null}
        </Modal>
      )}
    </>
  );
}

export default InvestorTable;
