import style from "./custombutton.module.css";
function CustomButton({ children, onClick }) {
  return (
    <>
      <button className={style.ButtonStyle} onClick={onClick}>
        {children}
      </button>
    </>
  );
}

export default CustomButton;
