import { useEffect, useState } from "react";
import ModalCompanyListItem from "./ModalCompanyListItem";
import { fetchRecentSelectedCompanies } from "../../api/api";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./ModalCompanyList.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

function ModalCompanyListRecent({ type }) {
  const [loading, setLoading] = useState(false);
  const [modalCompanies, setModalCompanies] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const data = await fetchRecentSelectedCompanies(userId);
      setModalCompanies(data);
    };

    try {
      console.log("진입함?");
      fetchData();
    } catch (e) {
      console.error(`최근 선택 기업 불러오기 오류: ${e}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.listBox}>
      <p
        className={styles.title}
      >{`최근 비교한 기업 (${modalCompanies.length})`}</p>
      <ul className={styles.companyList}>
        {loading && <LoadingSpinner />}
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
