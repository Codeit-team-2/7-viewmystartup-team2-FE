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

    return data;
  } catch (err) {
    console.error("❌ loginUser API error:", err);
    throw err;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("nickname");
  localStorage.removeItem("userId");
  // 필요 시 redirect or 상태 초기화도 가능
};

export const getStoredUser = () => {
  return localStorage.getItem("nickname");
};
