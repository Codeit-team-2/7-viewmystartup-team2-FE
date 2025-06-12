import { useState } from "react";
import MyCompanySelectModal from "./MyCompanySelectModal";
import BtnPlus from "../../assets/btn_plus.png";
import "./MyCompany.css";

function MyCompanySection() {
  const [isMyCompany, setIsMyCompany] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIsMyCompany = (value) => {
    setIsMyCompany(value);
  };

  const handleIsModalOpen = (value) => {
    setIsModalOpen(value);
  };

  return (
    <div className="myCompanySection">
      <h2>나의 기업을 선택해 주세요!</h2>
      <div>
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
          {/* {isMyCompany && <CompanyCard />} */}
        </div>
      </div>
    </div>
  );
}

export default MyCompanySection;
