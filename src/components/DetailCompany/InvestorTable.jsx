import React, { useState } from "react";
import { investorsListData } from "../../config/investorsListData.js";
import InvestorSelectBtn from "./InvestorSelectBtn.jsx";
import Modal from "../Modal/Modal.jsx";

function InvestorTable({ companyId, page, pageSize }) {
  const investors = (investorsListData[companyId] || [])
    .slice()
    .sort((a, b) => a.rank - b.rank);

  const start = (page - 1) * pageSize;
  const currentInvestors = investors.slice(start, start + pageSize);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedInvestor, setSelectedInvestor] = useState(null);

  const handleAction = (action, investor) => {
    setModalAction(action);
    setSelectedInvestor(investor);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalAction("");
    setSelectedInvestor(null);
  };

  return (
    <>
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", margin: "10px 0" }}
      >
        <thead>
          <tr>
            <th>이름</th>
            <th>순위</th>
            <th>투자금액(억)</th>
            <th>투자 코멘트</th>
          </tr>
        </thead>
        <tbody>
          {currentInvestors.map(inv => (
            <tr key={inv.rank}>
              <td>{inv.name}</td>
              <td>{inv.rank}</td>
              <td>{inv.amount}</td>
              <td>
                {inv.comment}
                <InvestorSelectBtn investor={inv} onAction={handleAction} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <Modal onClose={handleModalClose} size="small">
          <div>
            <h3>{modalAction === "edit" ? "수정하기" : "삭제하기"}</h3>
            <input type="password" placeholder="배스워드를 입력해주세요" />
            <button>확인</button>
            <button onClick={handleModalClose}>취소</button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default InvestorTable;
