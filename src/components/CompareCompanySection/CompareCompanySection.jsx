import { useIsMyCompany } from "../MyCompanySection/MyCompanyContext";
import "./CompareCompany.css";

function CompareCompanySection() {
  const isMyCompany = useIsMyCompany();

  if (!isMyCompany) {
    return;
  } // 나의 기업을 선택한 상황에서만 비교 기업 선택하는 필드가 나오게 함

  return (
    <div className="compareCompanySection">
      <h2>어떤 기업이 궁금하세요?</h2>
      {/* <div>
        <div className="background">
          {!isMyCompany && (
            <div>
              <img
                src={BtnPlus}
                alt="나의 기업 추가하기 버튼"
                onClick={() => setIsModalOpen(true)}
              />
              <span>기업 추가</span>
            </div>
          )}
          {isModalOpen && (
            <MyCompanySelectModal
              onCompany={handleIsMyCompany}
              onModal={handleIsModalOpen}
            />
          )}
          {isMyCompany && (
            <>
              <p onClick={() => setMyCompany({})}>선택 취소</p>
              <CompanyCard name="myCompany" button={false} data={myCompany} />
            </>
          )}
        </div>
      </div> */}
    </div>
  );
}

export default CompareCompanySection;
