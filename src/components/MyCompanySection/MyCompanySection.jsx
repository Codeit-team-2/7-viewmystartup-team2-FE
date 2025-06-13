import { useState } from "react";
import MyCompanySelectModal from "./MyCompanySelectModal";
import CompanyCard from "../CompanyCard";
import BtnPlus from "../../assets/btn_plus.png";
import MainLogo from "../../assets/main_logo.svg";
import "./MyCompany.css";

function MyCompanySection({ name }) {
  const [isMyCompany, setIsMyCompany] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIsMyCompany = (value) => {
    setIsMyCompany(value);
  };

  const handleIsModalOpen = (value) => {
    setIsModalOpen(value);
  };

  const myCompanyData = {
    name: "코드잇",
    name2: "에듀테크",
    imgUrl: { MainLogo },
  };

  return (
    <div className="myCompanySection">
      <h2>{name}</h2>
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
          {isMyCompany && (
            <CompanyCard name="myCompany" button={true} data={myCompanyData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCompanySection;
