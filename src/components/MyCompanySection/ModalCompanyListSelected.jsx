import { useCompareCompany } from "../CompareCompanySection/CompareCompanyContext";
import ModalCompanyListItem from "./ModalCompanyListItem";
import styles from "./ModalCompanyList.module.css";

function ModalCompanyListSelected({ type }) {
  const modalCompanies = useCompareCompany();

  return (
    <div className={styles.listBox}>
      <p className={styles.title}>{`선택한 기업 (${modalCompanies.length})`}</p>
      <ul className={styles.companyList}>
        {modalCompanies.map((company) => (
          <ModalCompanyListItem
            key={company.id}
            company={company}
            type={type}
          />
        ))}
      </ul>
    </div>
  );
}

export default ModalCompanyListSelected;
