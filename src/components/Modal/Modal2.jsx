import React, { useState } from "react";
import "./Modal2.module.css";

function ModalInner({ onModal, children }) {
  const onClickModalClose = () => {
    onModal(false);
  };

  return (
    <div className="modalBackground" onClick={onClickModalClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function Modal2({ btnText, children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const text = btnText ? btnText : "모달 오픈";

  const handleIsModalOpen = (value) => {
    setIsModalOpen(value);
  };

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {text}
      </button>
      {isModalOpen && (
        <ModalInner onModal={handleIsModalOpen}>{children}</ModalInner>
      )}
    </>
  );
}

export default Modal2;
