import { useEffect, useState } from "react";
import MyCompanySelectModal from "./MyCompanySelectModal";
import CompanyCard from "../CompanyCard";
import BtnPlus from "../../assets/btn_plus.png";
import "./MyCompany.css";
import {
  useIsMyCompany,
  useMyCompany,
  useSetIsMyCompany,
  useSetMyCompany,
} from "./MyCompanyContext";

function MyCompanySection() {
  const isMyCompany = useIsMyCompany();
  const setIsMyCompany = useSetIsMyCompany();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const myCompany = useMyCompany();
  const setMyCompany = useSetMyCompany();

  const handleIsMyCompany = (value) => {
    setIsMyCompany(value);
  };

  const handleIsModalOpen = (value) => {
    setIsModalOpen(value);
  };

  useEffect(() => {
    if (Object.keys(myCompany).length !== 0) {
      setIsMyCompany(true);
      setIsModalOpen(false);
    } else {
      setIsMyCompany(false);
    }
    console.log(myCompany);
  }, [myCompany]);

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
          {isMyCompany && (
            <>
              <p onClick={() => setMyCompany({})}>선택 취소</p>
              <CompanyCard name="myCompany" button={false} data={myCompany} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCompanySection;
