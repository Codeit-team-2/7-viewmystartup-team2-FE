import React from "react";

function PaginationBtn({
  page,
  pageNumbers,
  hasPrev,
  hasNext,
  handlePageChange,
}) {
  return (
    <div>
      <button
        className="pageButton"
        onClick={() => handlePageChange(page - 1)}
        disabled={!hasPrev}
      >
        &lt;
      </button>
      {pageNumbers.map(num => (
        <button
          className={`pageButton${num === page ? " active" : ""}`}
          key={num}
          onClick={() => handlePageChange(num)}
          disabled={num === page}
        >
          {num}
        </button>
      ))}
      <button
        className="pageButton"
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNext}
      >
        &gt;
      </button>
    </div>
  );
}
export default PaginationBtn;
