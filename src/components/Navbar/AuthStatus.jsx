//src/components/Navbar/AuthStatus.jsx
import React from "react";
import { logoutUser, getStoredUser } from "../../api/auth";

export default function AuthStatus() {
  const nickname = getStoredUser();

  if (!nickname) return null;

  const handleLogout = () => {
    logoutUser();
    window.location.reload(); // 로그인 모달 유도용 새로고침
  };

  return (
    <div className="auth-status">
      <span>{nickname}님 환영합니다!</span>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
