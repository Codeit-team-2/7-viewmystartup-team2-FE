// src/hooks/useSearchFilter.js
import { useState } from "react";

export function useSearchFilter() {
  const [keyword, setKeyword] = useState("");
  const search = (newKeyword) => {
    setKeyword(newKeyword);
  };
  // console.log(`'${nickname}'(${userId})님이 keword : '${keyword}'라고 검색함`);
  return { keyword, search };
}
