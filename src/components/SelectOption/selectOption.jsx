import style from "./selectOption.module.css";
function SelectOption() {
  return (
    <div>
      <select className={style.selectBox}>
        <option value="investment_desc">누적 투자금액 높은순</option>
        <option value="investment_asc">누적 투자금액 낮은순</option>
        <option value="revenue_desc">매출액 높은순</option>
        <option value="revenue_asc">매출액 낮은순</option>
        <option value="employment_desc">고용 인원 높은순</option>
        <option value="employment_asc">고용 인원 낮은순</option>
      </select>
    </div>
  );
}

export default SelectOption;
