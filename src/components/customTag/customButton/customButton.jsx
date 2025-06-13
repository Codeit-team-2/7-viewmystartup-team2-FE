import style from "./custombutton.module.css";
function CustomButton({ children, onClick }) {
  return (
    <div>
      <button className={style.ButtonStyle} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default CustomButton;
