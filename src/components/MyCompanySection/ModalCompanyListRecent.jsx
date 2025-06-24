import { useEffect, useState } from "react";
import ModalCompanyListItem from "./ModalCompanyListItem";
import { fetchRecentSelectedCompanies } from "../../api/api";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./ModalCompanyList.module.css";

function ModalCompanyListRecent({ type }) {
  const [modalCompanies, setModalCompanies] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchRecentSelectedCompanies(userId);
      setModalCompanies(data);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.listBox}>
      <p
        className={styles.title}
      >{`최근 비교한 기업 (${modalCompanies.length})`}</p>
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

export default ModalCompanyListRecent;
