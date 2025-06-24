// src/hooks/useSearchFilter.js
import { useState } from "react";

export function useSearchFilter() {
  const [keyword, setKeyword] = useState(""); // SearchBar에서 엔터누르거나 돋보기 클릭하면 return하면 넘어오는 결과값

  const search = (newKeyword) => {
    setKeyword(newKeyword);
  };
  const nickname = localStorage.getItem("nickname") || "익명사용자";
  const userId = localStorage.getItem("userId") || "UnidentifiedID";
  console.log(`'${nickname}'(${userId})님이 keword : '${keyword}'라고 검색함`);
  return { keyword, search };
}
