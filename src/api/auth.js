// src/api/auth.js
const apiUrl = import.meta.env.VITE_API_URL;

export const loginUser = async ({ nickname, password }) => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "로그인 실패");
    }
    // 👉 예상 응답 구조
    // data: { nickname, userId, email, balance, investmentsCount }

    return {
      nickname: data.nickname,
      userId: data.userId,
      email: data.email,
      balance: data.balance,
      investmentsCount: data.investmentsCount,
    };
  } catch (err) {
    console.error("❌ loginUser API error:", err);
    throw err;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("nickname");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("balance");
  localStorage.removeItem("investmentsCount");
};

export const getStoredUser = () => {
  return localStorage.getItem("nickname");
};

export const refreshUserInfo = async nickname => {
  try {
    const res = await fetch(`${apiUrl}/auth/refresh/${nickname}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "정보 갱신 실패");

    return {
      nickname: data.nickname,
      userId: data.userId,
      email: data.email,
      balance: data.balance,
      investmentsCount: data.investmentsCount,
    };
  } catch (err) {
    console.error("❌ refreshUserInfo error:", err);
    throw err;
  }
};
