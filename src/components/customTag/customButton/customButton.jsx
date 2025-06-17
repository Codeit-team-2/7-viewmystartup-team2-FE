import style from "./custombutton.module.css";


function CustomButton({ children, onClick, type }) {
  return (
    <>
      <button className={style.ButtonStyle} onClick={onClick} type={type}>

        {children}
      </button>
    </>
  );
}

export default CustomButton;
