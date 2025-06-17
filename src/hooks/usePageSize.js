// src/hooks/usePageSize.js
import { useState } from "react";

export function usePageSize(defaultSize = 5) {
  const [pageSize, setPageSize] = useState(defaultSize);

  //추후 config로 보낼것
  const pageSizeNum = {
    mobile: 5,
    tablet: 10,
    pc: 20,
  };

  const pageSizeOptions = [
    pageSizeNum.mobile,
    pageSizeNum.tablet,
    pageSizeNum.pc,
  ];

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  return {
    pageSize,
    pageSizeOptions,
    handlePageSizeChange,
  };
}
