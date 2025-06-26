//src/components/Navbar/AuthStatus.jsx
import React, { useEffect, useRef, useState } from "react";
// import { logoutUser, getStoredUser } from "../../api/auth";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./AuthStatus.module.css";
import { Link } from "react-router-dom";

export default function AuthStatus({ onLogoutSuccess }) {
  const { nickname, email, balance, investmentsCount, logout, isLoggedIn } =
    useAuth();
  const [showInfo, setShowInfo] = useState(false);
  const infoBoxRef = useRef();

  useEffect(() => {
    if (!showInfo) return;
    function handleAreaClick(e) {
      if (infoBoxRef.current && !infoBoxRef.current.contains(e.target)) {
        setShowInfo(false);
      }
    }
    document.addEventListener("mousedown", handleAreaClick);
    return () => document.removeEventListener("mousedown", handleAreaClick);
  }, [showInfo]);

  if (!isLoggedIn) return null;

  const handleLogout = () => {
    logout();
    if (onLogoutSuccess) onLogoutSuccess();
  };

  const handleNameClick = () => setShowInfo(v => !v);

  return (
    <div className={styles.box}>
      <span className={styles.text}>
        <span className={styles.name} onClick={handleNameClick}>
          {nickname}님
        </span>
        <br />
        환영합니다!
      </span>
      {showInfo && (
        <div className={styles.infoBox} ref={infoBoxRef}>
          <div className={styles.infoName}>{nickname}</div>
          <div className={styles.textBox}>
            <div className={styles.infoText}>
              이메일<span className={styles.spanText}>{email}</span>
            </div>
            <div className={styles.infoText}>
              자산
              <span className={styles.spanText}>
                {balance}
                <span className={styles.lastText}> 억 원</span>
              </span>
            </div>
            <div className={styles.infoText}>
              투자 기업수
              <span className={styles.spanText}>
                {investmentsCount}
                <span className={styles.lastText}> 기업</span>
              </span>
            </div>
          </div>
          <Link
            to="/investmentoverview"
            className={styles.btn}
            onClick={() => setShowInfo(false)}
          >
            나의 투자현황 보기
          </Link>
          <button className={styles.btn} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
