import CompanySelectBtn from "./CompanySelectBtn";
import useBoolean from "../../hooks/useBoolean";
import { useMyCompany, useSetMyCompany } from "./MyCompanyContext";
import { useEffect } from "react";
import {
  useCompareCompany,
  useSetCompareCompany,
} from "../CompareCompanySection/CompareCompanyContext";
import React from "react";

function ModalCompanyListItem({ company, type }) {
  const myCompany = useMyCompany();
  const compareCompany = useCompareCompany();
  const initBoolean =
    type === "compareCompany"
      ? compareCompany === company
      : myCompany === company;

  const [isSelected, switchIsSelected] = useBoolean(initBoolean);

  const setMyCompany = useSetMyCompany();
  const setCompareCompany = useSetCompareCompany();

  useEffect(() => {
    if (type === "compareCompany") {
      if (isSelected) {
        setCompareCompany((prev) => [...prev, company]);
      } else {
        console.log("이 if문 진입이 되고 있나?");
        setCompareCompany((prev) => prev.filter((item) => item !== company));
      }
    } else {
      if (isSelected) {
        setMyCompany(company);
      } else {
        setMyCompany({});
      }
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
