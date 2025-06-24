import { useState, useEffect } from "react";
import { useIsMyCompany } from "../MyCompanySection/MyCompanyContext";
import {
  useCompareCompany,
  useIsCompareCompany,
  useSetIsCompareCompany,
} from "./CompareCompanyContext";
import CompanyCard from "../CompanyCard";
import CompanySelectModal from "../MyCompanySection/CompanySelectModal";
import React from "react";

function CompareCompanySection() {
  const isMyCompany = useIsMyCompany();
  const isCompareCompany = useIsCompareCompany();
  const setIsCompareCompany = useSetIsCompareCompany();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const compareCompany = useCompareCompany();

  const handleIsModalOpen = (value) => {
    setIsModalOpen(value);
  };

  useEffect(() => {
    if (Object.keys(compareCompany).length !== 0) {
      setIsCompareCompany(true);
    } else {
      setIsCompareCompany(false);
    }
    console.log(`비교회사: ${compareCompany}`);
  }, [compareCompany]);

  if (!isMyCompany) {
    return;
  } // 나의 기업을 선택한 상황에서만 비교 기업 선택하는 필드가 나오게 함

  return (
    <div className="compareCompanySection">
      <h2>어떤 기업이 궁금하세요?</h2>
      <button onClick={() => setIsModalOpen(true)}>기업 추가하기</button>
      <div>
        <div className="background">
          {!isCompareCompany && (
            <p>
              아직 추가한 기업이 없어요, <br />
              버튼을 눌러 기업을 추가해보세요!
            </p>
          )}
          {isModalOpen && (
            <CompanySelectModal
              type="compareCompany"
              onModal={handleIsModalOpen}
            />
          )}

          {isCompareCompany && (
            <>
              {compareCompany.map((company) => (
                <CompanyCard
                  key={company.id}
                  name="compareCompany"
                  button={true}
                  data={company}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompareCompanySection;
