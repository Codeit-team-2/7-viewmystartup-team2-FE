import CompanySelectBtn from "./CompanySelectBtn";
import useBoolean from "../../hooks/useBoolean";
import { useMyCompany, useSetMyCompany } from "./MyCompanyContext";
import { useEffect } from "react";

function ModalCompanyListItem({ company }) {
  const myCompany = useMyCompany();
  const [isSelected, switchIsSelected] = useBoolean(myCompany === company);
  const setMyCompany = useSetMyCompany();

  useEffect(() => {
    if (isSelected) {
      setMyCompany(company);
    } else {
      setMyCompany({});
    }
  }, [isSelected]);

  return (
    <div>
      <img>{company.icon}</img>
      <p>{company.name}</p>
      <p>{company.name2}</p>
      <CompanySelectBtn
        isSelected={isSelected}
        onSwitch={() => switchIsSelected()}
      />
    </div>
  );
}

export default ModalCompanyListItem;
