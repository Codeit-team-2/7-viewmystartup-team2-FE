// src/utils/formatCompanyData.js
import {
  formatFromBillion,
  formatFromTrillionFloat,
} from "./formatCurrency.js";

/**
 * 공통 포맷터: 기업 리스트
 */
export const formatCompanyList = (data, options = {}) => {
  const {
    includeVmsInvestment = false, // 투자금 포함 여부
    isNestedCompany = false,      // company 속에 companyName처럼 중첩 여부
  } = options;

  return data.map((item, idx) => {
    const source = isNestedCompany ? item.company || {} : item;

    return {
      rank: idx + 1,
      companyName: source.companyName || "-",
      description: item.description || item.comment || "-",
      category: source.category || "-",
      totalInvestment: formatFromTrillionFloat(source.totalInvestment || 0),
      revenue: formatFromTrillionFloat(source.revenue || 0),
      employees: source.employees
        ? `${source.employees.toLocaleString()}명`
        : "-",
      imgUrl: source.imgUrl || null,
      ...(includeVmsInvestment && {
        vmsInvestment: formatFromBillion(item.howMuch || 0),
      }),
    };
  });
};
