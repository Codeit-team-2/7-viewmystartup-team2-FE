// src/api/auth.js
export const loginUser = async ({ nickname, password }) => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
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
