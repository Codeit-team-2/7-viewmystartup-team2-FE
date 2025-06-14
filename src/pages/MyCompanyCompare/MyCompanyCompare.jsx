import { MyCompanyProvider } from "../../components/MyCompanySection/MyCompanyContext";
import MyCompanySection from "../../components/MyCompanySection/MyCompanySection";

function MyCompanyCompare() {
  return (
    <>
      <MyCompanyProvider defaultValue={{}}>
        <MyCompanySection />
      </MyCompanyProvider>
      {/* <CompareCompanySection />
      <CompareButtonSection /> */}
    </>
  );
}

export default MyCompanyCompare;
