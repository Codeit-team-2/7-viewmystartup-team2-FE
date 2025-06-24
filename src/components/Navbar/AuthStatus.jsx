//src/components/Navbar/AuthStatus.jsx
import React from "react";
// import { logoutUser, getStoredUser } from "../../api/auth";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./AuthStatus.module.css";

export default function AuthStatus({ onLogoutSuccess }) {
  const { nickname, logout, isLoggedIn } = useAuth();
  if (!isLoggedIn) return null;

  const handleLogout = () => {
    logout();
    if (onLogoutSuccess) onLogoutSuccess();
  };
  return (
    <div className={styles.box}>
      <span className={styles.text}>
        <span className={styles.name}>{nickname}님</span>
        <br />
        환영합니다!
      </span>
      <button className={styles.btn} onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}
