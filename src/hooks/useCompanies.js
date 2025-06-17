import { useEffect, useState } from "react";
import { fetchAllCompanies } from "../api/company";

export const useCompanies = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCompanies()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
