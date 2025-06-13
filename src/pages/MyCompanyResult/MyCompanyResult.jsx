//흠 뭐해야할까 일단 기본적인 틀만들어볼까? ..
import MyCompanySection from "../../components/MyCompanySection/MyCompanySection";
import FetchTable from "../../components/FetchTable/FetchTable";
import { invInitialData } from "../../config/invInitialData_v2";
import SelectOption from "../../components/SelectOption/selectOption";
import CustomButton from "../../components/customTag/customButton/customButton";
import style from "./MyCompanyResult.module.css";

const columns = [
  { label: "기업명", key: "companyName" },
  { label: "기업 소개", key: "description" },
  { label: "카테고리", key: "category" },
  { label: "누적 투자 금액", key: "totalInvestment" },
  { label: "매출액", key: "revenue" },
  { label: "고용 인원", key: "employees" },
];

function MyCompanyResult() {
  return (
    <div>
      <div className={style.asdasd}>
        <MyCompanySection name={"asdasdasd"}></MyCompanySection>
        <CustomButton>다른기업비교하기</CustomButton>
      </div>
      <div>
        <div className={style.asdasd}>
          <span>비교 결과 확인하기</span>
          <SelectOption></SelectOption>
        </div>
        <FetchTable data={invInitialData.slice(0, 5)} columns={columns} />
      </div>
      <div>
        <div className={style.asdasd}>
          <span>기업 순위 확인하기</span>
          <SelectOption></SelectOption>
        </div>
        <FetchTable data={invInitialData.slice(0, 5)} columns={columns} />
        <CustomButton>나의 기업에 투자하기</CustomButton>
      </div>
    </div>
  );
}

export default MyCompanyResult;
