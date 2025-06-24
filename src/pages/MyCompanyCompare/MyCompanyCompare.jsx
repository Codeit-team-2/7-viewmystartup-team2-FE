import CompareButtonSection from "../../components/CompareButtonSection/CompareButtonSection";
import { CompareCompanyProvider } from "../../components/CompareCompanySection/CompareCompanyContext";
import CompareCompanySection from "../../components/CompareCompanySection/CompareCompanySection";
import { MyCompanyProvider } from "../../components/MyCompanySection/MyCompanyContext";
import MyCompanySection from "../../components/MyCompanySection/MyCompanySection";
import React from "react";
import styles from "./MyCompanyCompare.module.css";
import MyCompanyReset from "../../components/MyCompanySection/MyCompanyReset";

function MyCompanyCompare() {
  return (
    <div className={styles.window}>
      <MyCompanyProvider defaultValue={{}}>
        <CompareCompanyProvider defaultValue={[]}>
          <div className={styles.main}>
            <MyCompanySection name={"나의 기업을 선택해 주세요!"}>
              <MyCompanyReset type={true} />
            </MyCompanySection>
            <CompareCompanySection />
            <CompareButtonSection />
          </div>
        </CompareCompanyProvider>
      </MyCompanyProvider>
    </div>
  );
}

export default MyCompanyCompare;
