import axios from "axios";
export const fetchAllCompanies = () =>
  axios.get("http://localhost:3000/companies").then((res) => res.data);
