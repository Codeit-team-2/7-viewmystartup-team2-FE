import { useState } from "react";
import MyCompanySelectModal from "./MyCompanySelectModal";

function MyCompanySection() {
  const [isMyCompany, setIsMyCompany] = useState(False);
  const [isModalOpen, setIsModalOpen] = useState(False);

  const handleIsMyCompany = (value) => {
    setIsMyCompany(value);
  };

  const handleIsModalOpen = (value) => {
    setIsModalOpen(value);
  };

  return (
    <div>
      <h2>나의 기업을 선택해 주세요!</h2>
      <div>
        <div className="background"></div>
        {!isMyCompany && <MyCompanyAddBtn handle={handleIsModalOpen} />}
        {isModalOpen && (
          <MyCompanySelectModal
            onCompany={handleIsMyCompany}
            onModal={handleIsModalOpen}
          />
        )}
        {isMyCompany && <CompanyCard />}
      </div>
    </div>
  );
}

export default MyCompanySection;
