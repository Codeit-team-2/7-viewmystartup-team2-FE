import CompareButtonSection from "../../components/CompareButtonSection/CompareButtonSection";
import { CompareCompanyProvider } from "../../components/CompareCompanySection/CompareCompanyContext";
import CompareCompanySection from "../../components/CompareCompanySection/CompareCompanySection";
import { MyCompanyProvider } from "../../components/MyCompanySection/MyCompanyContext";
import MyCompanySection from "../../components/MyCompanySection/MyCompanySection";

function MyCompanyCompare() {
  return (
    <>
      <MyCompanyProvider defaultValue={{}}>
        <CompareCompanyProvider defaultValue={[]}>

          <MyCompanySection name={"나의 기업을 선택해 주세요!"} />

          <CompareCompanySection />
          <CompareButtonSection />
        </CompareCompanyProvider>
      </MyCompanyProvider>
    </>
  );
}

export default MyCompanyCompare;
