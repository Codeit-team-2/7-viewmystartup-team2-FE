//src/components/Navbar/AuthStatus.jsx
import React, { useEffect, useRef, useState } from "react";
// import { logoutUser, getStoredUser } from "../../api/auth";
import { useAuth } from "../Contexts/AuthContext";
import styles from "./AuthStatus.module.css";
import { Link } from "react-router-dom";
import { refreshUserInfo } from "../../api/auth";
import { useFetchLoading } from "../../hooks/useFetchLoading";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function AuthStatus({ onLogoutSuccess }) {
  const { isFetchLoading, startFetchLoading, endFetchLoading } =
    useFetchLoading();
  const {
    nickname,
    email,
    balance,
    investmentsCount,
    logout,
    isLoggedIn,
    refresh,
  } = useAuth();
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

  const handleNameClick = () => setShowInfo((v) => !v);

  const handleRefresh = async () => {
    startFetchLoading();
    try {
      const data = await refreshUserInfo(nickname);
      refresh(data); // context 업데이트
      alert("✅ 정보가 최신화되었습니다!");
    } catch (err) {
      alert("❌ 정보 최신화에 실패했습니다.");
    } finally {
      endFetchLoading();
    }
  };

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
          {isFetchLoading ? (
            <LoadingSpinner />
          ) : (
            <button className={styles.btn} onClick={handleRefresh}>
              내 정보 최신화하기
            </button>
          )}

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
