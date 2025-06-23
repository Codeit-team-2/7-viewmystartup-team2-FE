//src/components/Contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [nickname, setNickname] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    const storedUserId = localStorage.getItem("userId");
    if (storedNickname) setNickname(storedNickname);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  const login = (nickname, userId) => {
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("userId", userId);
    setNickname(nickname);
    setUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem("nickname");
    localStorage.removeItem("userId");
    setNickname(null);
    setUserId(null);
  };

  const isLoggedIn = Boolean(nickname && userId);

  return (
    <AuthContext.Provider
      value={{ nickname, userId, isLoggedIn, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
