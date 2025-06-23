//src/components/Navbar/AuthStatus.jsx
import React from "react";
// import { logoutUser, getStoredUser } from "../../api/auth";
import { useAuth } from "../Contexts/AuthContext";

export default function AuthStatus() {
  const { nickname, logout, isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;

  // const nickname = getStoredUser();
  // if (!nickname) return null;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="auth-status">
      <span>{nickname}님 환영합니다!</span>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
