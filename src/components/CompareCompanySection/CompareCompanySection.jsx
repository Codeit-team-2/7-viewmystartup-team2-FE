import { useState } from "react";
import { useIsMyCompany } from "../MyCompanySection/MyCompanyContext";
import "./CompareCompany.css";
import { useIsCompareCompany } from "./CompareCompanyContext";
import CompareCompanySelectModal from "./CompareCompanySelectModal";

function CompareCompanySection() {
  const isMyCompany = useIsMyCompany();
  const isCompareCompany = useIsCompareCompany();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIsModalOpen = (value) => {
    setIsModalOpen(value);
  };

  console.log(`isComCom: ${isCompareCompany}`);
  console.log(`isComModal: ${isModalOpen}`);

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
            <CompareCompanySelectModal
              name="compareCompany"
              listName={["selected", "search"]}
              onCompany={"뭐더라이거"}
              onModal={handleIsModalOpen}
            />
          )}
          {/*
          {isMyCompany && (
            <>
              <p onClick={() => setMyCompany({})}>선택 취소</p>
              <CompanyCard name="myCompany" button={false} data={myCompany} />
            </>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default CompareCompanySection;
