import React from "react";
import styles from "./PaginationBtn.module.css";

function PaginationBtn({
  page,
  pageNumbers,
  hasPrev,
  hasNext,
  handlePageChange,
}) {
  return (
    <div className={styles.area}>
      <button
        className={styles.pageButton}
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPrev}
      >
        &lt;
      </button>
      {pageNumbers.map(num => (
        <button
          className={`${styles.pageButton} ${
            num === page ? styles.active : ""
          }`}
          key={num}
          onClick={() => handlePageChange(num)}
          disabled={num === page}
        >
          {num}
        </button>
      ))}
      <button
        className={styles.pageButton}
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNext}
      >
        &gt;
      </button>
    </div>
  );
}
export default PaginationBtn;
