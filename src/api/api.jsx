import axios from "axios";

// keyword를 받아서 데이터 fetch
export const fetchFilteredData = async (keyword) => {
  try {
    const res = await axios.get("http://localhost:3000/companies/filtered", {
      params: { keyword },
    });
    return res.data;
  } catch (e) {
    if (e.response) {
      // 리퀘스트는 성공했지만 상태 코드가 실패(4XX, 5XX)를 나타냄
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      // 리퀘스트 자체가 실패
      console.log("리퀘스트가 실패했습니다.");
    }
  }
};

export const fetchRecentSelectedCompanies = async (userId) => {
  try {
    const res = await axios.get("http://localhost:3000/companies/recent", {
      params: { userId },
    });
    return res.data;
  } catch (e) {
    if (e.response) {
      // 리퀘스트는 성공했지만 상태 코드가 실패(4XX, 5XX)를 나타냄
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      // 리퀘스트 자체가 실패
      console.log("리퀘스트가 실패했습니다.");
    }
  }
};

// 기업 상세
export const fetchCompanyDetailData = async (companyId) => {
  try {
    const res = await axios.get(`http://localhost:3000/companies/${companyId}`);
    return res.data;
  } catch (e) {
    if (e.response) {
      // 리퀘스트는 성공했지만 상태 코드가 실패(4XX, 5XX)를 나타냄
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      // 리퀘스트 자체가 실패
      console.log("리퀘스트가 실패했습니다.");
    }
  }
};

// 기업 투자자 목록
export const fetchCompanyInvestorsData = async (companyId) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/companies/${companyId}/investments`
    );
    return res.data;
  } catch (e) {
    if (e.response) {
      // 리퀘스트는 성공했지만 상태 코드가 실패(4XX, 5XX)를 나타냄
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      // 리퀘스트 자체가 실패
      console.log("리퀘스트가 실패했습니다.");
    }
  }

};

export const createMyCompanySelection = async (userId, companyId) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/my-company-selections",
      {
        userId,
        companyId,
      }
    );
    return res.data;
  } catch (e) {
    if (e.response) {
      // 리퀘스트는 성공했지만 상태 코드가 실패(4XX, 5XX)를 나타냄
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      // 리퀘스트 자체가 실패
      console.log("리퀘스트가 실패했습니다.");
    }
  }
};

export const createCompareCompanySelection = async (userId, companyIds) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/compare-company-selections",
      {
        userId,
        companyIds,
      }
    );
  } catch (e) {
    if (e.response) {
      // 리퀘스트는 성공했지만 상태 코드가 실패(4XX, 5XX)를 나타냄
      console.log(e.response.status);
      console.log(e.response.data);
    } else {
      // 리퀘스트 자체가 실패
      console.log("리퀘스트가 실패했습니다.");
    }
  }
};
