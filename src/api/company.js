// src/api/company.js
import axios from "axios";

export const fetchAllCompanies = (sortBy = "revenue", order = "desc") => {
  return axios
    .get("http://localhost:3000/companies", {
      params: { sortBy, order },
    })
    .then((res) => res.data);
};
