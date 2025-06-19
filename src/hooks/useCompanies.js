// src/hooks/useCompanies.js
import { useEffect, useState } from "react";
import { fetchAllCompanies } from "../api/company";

//객체형태로 넣어서 없어도 돌아감
export const useCompanies = ({ sortBy = "", order = "" } = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await fetchAllCompanies(sortBy, order); // 인자 넘겨주기
        setLoading(true);
        setData(result);
      } catch (err) {
        console.error("기업 데이터 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [sortBy, order]);

  return { data, loading };
};
