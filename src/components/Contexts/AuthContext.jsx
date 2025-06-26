//src/components/Contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [nickname, setNickname] = useState(() =>
    localStorage.getItem("nickname")
  );
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));
  const [email, setEmail] = useState(() => localStorage.getItem("email"));
  const [balance, setBalance] = useState(() =>
    Number(localStorage.getItem("balance") || 0)
  );
  const [investmentsCount, setInvestmentsCount] = useState(() =>
    Number(localStorage.getItem("investmentsCount") || 0)
  );

  const isLoggedIn = Boolean(nickname && userId);

  const login = ({ nickname, userId, email, balance, investmentsCount }) => {
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("userId", userId);
    localStorage.setItem("email", email);
    localStorage.setItem("balance", balance.toString());
    localStorage.setItem("investmentsCount", investmentsCount.toString());

    setNickname(nickname);
    setUserId(userId);
    setEmail(email);
    setBalance(balance);
    setInvestmentsCount(investmentsCount);
  };

  const logout = () => {
    localStorage.removeItem("nickname");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("balance");
    localStorage.removeItem("investmentsCount");

    setNickname(null);
    setUserId(null);
    setEmail(null);
    setBalance(0);
    setInvestmentsCount(0);
  };
  const refresh = ({ email, balance, investmentsCount }) => {
    localStorage.setItem("email", email);
    localStorage.setItem("balance", balance.toString());
    localStorage.setItem("investmentsCount", investmentsCount.toString());

    setEmail(email);
    setBalance(balance);
    setInvestmentsCount(investmentsCount);
  };

  return (
    <AuthContext.Provider
      value={{
        nickname,
        userId,
        email,
        balance,
        investmentsCount,
        isLoggedIn,
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
