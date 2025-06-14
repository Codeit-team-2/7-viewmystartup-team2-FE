function CompanySelectBtn({ isSelected, onSwitch }) {
  const onBtnClick = () => {
    onSwitch();
  };

  return <button onClick={onBtnClick}>선택하기</button>;
}

export default CompanySelectBtn;
