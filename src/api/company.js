// src/api/company.js
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

//기존 키워드 없이 다가져오는 부분 삭제예정
export const fetchAllCompanies = (sortBy = "revenue", order = "desc") => {
  return axios
    .get(`${apiUrl}/companies`, {
      params: { sortBy, order },
    })
    .then((res) => res.data);
};

export const fetchFilteredDataWJ = (
  keyword,
  sortBy = "revenue",
  order = "desc"
) => {
  return axios
    .get(`${apiUrl}/companies`, {
      params: { keyword, sortBy, order },
    })
    .then((res) => res.data);
};

export const fetchInvestmentOverviewData = (
  keyword,
  sortBy = "vmsInvestment",
  order = "desc"
) => {
  return axios
    .get(`${apiUrl}/companies/investment-overview`, {
      params: { keyword, sortBy, order },
    })
    .then((res) => res.data);
};

export const fetchSelectedOverviewData = (keyword, sortBy, order) => {
  return axios
    .get(`${apiUrl}/companies/selected-overview`, {
      params: { keyword, sortBy, order },
    })
    .then((res) => res.data);
};

//내 투자현황 목록

export const matchingInvestmentUserList = async ({
  userId,
  nickname,
  sortBy,
  order,
  keyword,
}) => {
  try {
    const params = {};
    if (userId) params.userId = userId;
    if (nickname) params.nickname = nickname;
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;
    if (keyword) params.keyword = keyword;

    const response = await axios.get(`${apiUrl}/investments`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("matchingInvestmentUserList api error:", error);
    return [];
  }
};

// 기업명 클릭했을때 기업 id 가져오는 api

export const getCompanyName = async (companyName) => {
  try {
    const res = await axios.get(
      `${apiUrl}/companies/companyName?companyName=${encodeURIComponent(
        companyName
      )}`
    );

    // axios는 자동으로 JSON 파싱되므로 .json() 필요 없음
    console.log("응답 데이터:", res.data);
    return res.data.id; // ← 응답 구조에 맞게 수정 필요
  } catch (error) {
    console.error("회사 ID 요청 실패:", error);
    return null;
  }
};
