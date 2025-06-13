// src/components/NoResult/NoResult.jsx
import styles from "./NoResult.module.css";
export default function NoResult({ keyword }) {
  return (
    <p>
      ‘<strong className={styles.keyword}>{keyword}</strong>’에 대한 검색 결과가 없습니다.
    </p>
  );
}
