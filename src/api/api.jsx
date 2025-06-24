import axios from "axios";

// keyword를 받아서 데이터 fetch
export const fetchFilteredData = async (query) => {
  try {
    const res = await axios.get("http://localhost:3000/companies/filtered", {
      params: query,
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
    const res = await axios.get(`http://localhost:3000/company/${companyId}`);
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
      `http://localhost:3000/company/${companyId}/investments`
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
// 비밀번호 검증
export async function postPasswordCheck(userId, password) {
  const response = await fetch(
    `http://localhost:3000/company/users/${userId}/passwordcheck`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    }
  );
  if (!response.ok) throw new Error("비밀번호가 일치하지 않습니다.");
  return response.json();
}
// 투자 수정
export async function updateInvestment(investmentId, userId, password, data) {
  try {
    const response = await fetch(
      `http://localhost:3000/company/investments/${investmentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          password,
          ...data,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("수정 실패");
    }
    const json = await response.json();
    console.log("updateInvestment 응답:", json);
    return json;
  } catch (e) {
    console.error("updateInvestment 내부 에러:", e);
    throw e; // catch로 넘김
  }
}
// 투자 정보 삭제
export async function deleteInvestment(investmentId, userId, password) {
  const response = await fetch(
    `http://localhost:3000/company/investments/${investmentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        password,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("삭제 실패");
  }
  return response.json();
}
