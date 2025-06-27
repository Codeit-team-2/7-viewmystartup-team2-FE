import { useEffect, useState } from "react";
import { fetchCompanyDetailData, fetchCompanyInvestorsData } from "../api/api";

export function useCompanyDetail(companyId) {
  const [company, setCompany] = useState(null);
  const [investors, setInvestors] = useState([]);

  useEffect(() => {
    fetchCompanyDetailData(companyId).then(setCompany);
    fetchCompanyInvestorsData(companyId).then(setInvestors);
  }, [companyId]);

  return { company, investors, setInvestors };
}
