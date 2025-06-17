// src/hooks/useSearchFilter.js
import { useState } from "react";

export function useSearchFilter(initialData) {
  const [keyword, setKeyword] = useState(""); // SearchBar에서 엔터누르거나 돋보기 클릭하면 return하면 넘어오는 결과값

  const filteredData =
    keyword === ""
      ? initialData
      : initialData.filter(
          (item) =>
            item.companyName.includes(keyword) ||
            item.description.includes(keyword)
        );

  const search = (newKeyword) => {
    setKeyword(newKeyword);
  };
  console.log("최종 검색할 keyword : ", keyword);
  return { keyword, filteredData, search };
}
