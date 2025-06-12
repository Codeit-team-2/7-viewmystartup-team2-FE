import BtnPlus from "../../assets/btn_plus.png";

function MyCompanyAddBtn({ handle }) {
  const onClick = () => {
    handle(True);
  };

  return (
    <>
      <img src={BtnPlus} alt="나의 기업 추가하기 버튼" onClick={onClick} />
      <span>기업 추가</span>
    </>
  );
}

export default MyCompanyAddBtn;
