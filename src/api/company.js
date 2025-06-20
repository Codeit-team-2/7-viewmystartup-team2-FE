// src/api/company.js
import axios from "axios";

//기존 키워드 없이 다가져오는 부분 삭제예정
export const fetchAllCompanies = (sortBy = "revenue", order = "desc") => {
  return axios
    .get("http://localhost:3000/companies", {
      params: { sortBy, order },
    })
    .then((res) => res.data);
};

export const fetchFilteredDataWJ = (keyword, sortBy = "revenue", order = "desc") => {
  return axios
    .get("http://localhost:3000/companies", {
      params: { keyword, sortBy, order },
    })
    .then((res) => res.data);
};