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

{
  /* <option value="investment_desc">누적 투자금액 높은순</option>
<option value="investment_asc">누적 투자금액 낮은순</option>
<option value="revenue_desc">매출액 높은순</option>
<option value="revenue_asc">매출액 낮은순</option>
<option value="employment_desc">고용 인원 높은순</option>
<option value="employment_asc">고용 인원 낮은순</option> */
  // 사용방법 일단 filterConfig.js 로 가서 예시처럼 만든다 그리고 나서
  {
    /* <SelectOption
  options={resultOptionsData}
  onChange={handleChange}
  ></SelectOption>
  이런식으로 적용하면된다  */
  }
}
