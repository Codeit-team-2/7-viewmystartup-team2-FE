import CompanySelectBtn from "./CompanySelectBtn";
import useBoolean from "../../hooks/useBoolean";
import { useMyCompany, useSetMyCompany } from "./MyCompanyContext";
import { useEffect } from "react";
import {
  useCompareCompany,
  useSetCompareCompany,
} from "../CompareCompanySection/CompareCompanyContext";
import React from "react";
import styles from "./ModalCompanyListItem.module.css";

function ModalCompanyListItem({ company, type }) {
  const myCompany = useMyCompany();
  const compareCompany = useCompareCompany();
  const initBoolean =
    type === "compareCompany"
      ? compareCompany.map((c) => c.id).includes(company.id)
      : myCompany === company;

  const [isSelected, switchIsSelected] = useBoolean(initBoolean);

  const setMyCompany = useSetMyCompany();
  const setCompareCompany = useSetCompareCompany();

  useEffect(() => {
    if (type === "compareCompany") {
      if (isSelected) {
        if (!compareCompany.map((c) => c.id).includes(company.id))
          setCompareCompany((prev) => [...prev, company]);
      } else {
        setCompareCompany((prev) =>
          prev.filter((item) => item.id !== company.id)
        );
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
    <li className={styles.item}>
      <div className={styles.info}>
        <img className={styles.img} src={data.imgUrl} />
        <p className={styles.companyName}>{company.companyName}</p>
        <p className={styles.category}>{company.category}</p>
      </div>
      <CompanySelectBtn
        isSelected={isSelected}
        onSwitch={() => switchIsSelected()}
      />
    </li>
  );
}

export default ModalCompanyListItem;
