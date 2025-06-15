import { CompareCompanyProvider } from "../../components/CompareCompanySection/CompareCompanyContext";
import CompareCompanySection from "../../components/CompareCompanySection/CompareCompanySection";
import { MyCompanyProvider } from "../../components/MyCompanySection/MyCompanyContext";
import MyCompanySection from "../../components/MyCompanySection/MyCompanySection";

function MyCompanyCompare() {
  return (
    <>
      <MyCompanyProvider defaultValue={{}}>
        <MyCompanySection />
        <CompareCompanyProvider defaultValue={[]}>
          <CompareCompanySection />
          {/* <CompareButtonSection /> */}
        </CompareCompanyProvider>
      </MyCompanyProvider>
    </>
  );
}

export default MyCompanyCompare;
