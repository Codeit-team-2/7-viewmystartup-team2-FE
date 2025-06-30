//src/components/Navbar/Navbar.jsx
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import LoginInput from "../LoginInput/LoginInput";
import { loginUser } from "../../api/auth";
import { useAuth } from "../Contexts/AuthContext";
import Modal from "../Modal/Modal";
import Toast from "../ToastMessage/Toast";
import { useToast } from "../../hooks/useToast";

export default function Navbar() {
  const { isLoggedIn, login } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const { toastMessage, setToastMessage, showToast, setShowToast } = useToast();

  useEffect(() => {}, [isLoggedIn]);

  const handleLogin = async (nickname, password) => {
    try {
      const data = await loginUser({ nickname, password }); //api/auth.js로 가져오기
      login(data); // ✅ Context의 login 함수로 상태 업데이트
      setOpenModal(false); //모달닫기
      setToastMessage("로그인 성공");
      setShowToast(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setToastMessage(err.message || "로그인에 실패했습니다.");
      setShowToast(true);
    }
  };

  return (
    <div className={styles.setting}>
      <div className={styles.navArea}>
        <NavLink to="/" className={styles.logo} />
        <div>
          <NavLink
            to="/mycompanycompare"
            className={({ isActive }) =>
              `${styles.navbarPage} ${isActive ? styles.active : ""}`
            }
          >
            나의 기업 비교
          </NavLink>
          <NavLink
            to="/selectedoverview"
            className={({ isActive }) =>
              `${styles.navbarPage} ${isActive ? styles.active : ""}`
            }
          >
            비교 현황
          </NavLink>
          <NavLink
            to="/investmentoverview"
            className={({ isActive }) =>
              `${styles.navbarPage} ${isActive ? styles.active : ""}`
            }
          >
            투자 내역
          </NavLink>
        </div>
      </div>
      <div>
        {!isLoggedIn && (
          <button
            id="login-button"
            className={styles.loginBtn}
            onClick={() => setOpenModal(true)}
          >
            로그인
          </button>
        )}
        {openModal && (
          <Modal onClose={() => setOpenModal(false)} size="small">
            <LoginInput onLogin={handleLogin} />
          </Modal>
        )}
        <Toast
          message={toastMessage}
          visible={showToast}
          onClose={() => setShowToast(false)}
        />
        <AuthStatus
          onLogoutSuccess={() => {
            setToastMessage("로그아웃 되었습니다");
            setShowToast(true);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }}
        />
      </div>
    </div>
  );
}
