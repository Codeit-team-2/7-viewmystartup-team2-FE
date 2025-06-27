import React from "react";
import styles from "./PaginationBtn.module.css";

function PaginationBtn({
  page,
  pageNumbers,
  hasPrev,
  hasNext,
  handlePageChange,
  btnClass,
  areaClass,
}) {
  return (
    <div className={`${styles.area} ${areaClass}`}>
      <button
        className={`${styles.pageButton} ${btnClass}`}
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPrev}
      >
        &lt;
      </button>
      {pageNumbers.map(num => (
        <button
          className={`${styles.pageButton} ${btnClass} ${
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
        className={`${styles.pageButton} ${btnClass}`}
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNext}
      >
        &gt;
      </button>
    </div>
  );
}
export default PaginationBtn;
