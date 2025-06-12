function MyCompanySelectModal({ onCompany, onModal }) {
  const onClickBackground = () => {
    onModal(False);
  };
  return (
    <div className="modalBackground" onClick={onClickBackground}>
      <div className="selectModal" onClick={(e) => e.stopPropagation()}>
        <p>모달 열림</p>
      </div>
    </div>
  );
}

export default MyCompanySelectModal;
