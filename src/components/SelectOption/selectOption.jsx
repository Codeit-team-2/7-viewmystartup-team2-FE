import style from "./selectOption.module.css";


function SelectOption({ options, onChange }) {
  return (
    <div>
      <select className={style.selectBox} onChange={onChange}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}

      </select>
    </div>
  );
}

export default SelectOption;