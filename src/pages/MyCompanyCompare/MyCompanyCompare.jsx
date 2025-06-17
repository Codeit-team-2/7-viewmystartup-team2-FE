import CompareCompanySection from "../../components/CompareCompanySection/CompareCompanySection";
import { MyCompanyProvider } from "../../components/MyCompanySection/MyCompanyContext";
import MyCompanySection from "../../components/MyCompanySection/MyCompanySection";

function MyCompanyCompare() {
  return (
    <>
      <MyCompanyProvider defaultValue={{}}>
        <MyCompanySection />
        <CompareCompanySection />
        {/* <CompareButtonSection /> */}
      </MyCompanyProvider>
    </>
  );
}

export default MyCompanyCompare;
