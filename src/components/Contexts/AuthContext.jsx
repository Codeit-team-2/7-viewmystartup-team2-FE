//src/components/Contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [nickname, setNickname] = useState(() =>
    localStorage.getItem("nickname")
  );
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));
  const isLoggedIn = Boolean(nickname && userId); 

  const login = (nickname, userId) => {
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("userId", userId);
    setNickname(nickname);
    setUserId(userId);
    // setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("nickname");
    localStorage.removeItem("userId");
    setNickname(null);
    setUserId(null);
    // setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ nickname, userId, isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
