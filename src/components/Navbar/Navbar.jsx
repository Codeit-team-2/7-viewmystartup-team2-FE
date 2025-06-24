//src/components/Navbar/Navbar.jsx
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import LoginInput from "../LoginInput/LoginInput";
import { loginUser } from "../../api/auth";
import { useAuth } from "../Contexts/AuthContext";
import Modal from "../Modal/Modal";
import CustomButton from "../customTag/customButton/customButton";
import btnStyle from "../customTag/customButton/customButton.module.css";

export default function Navbar() {
  const { isLoggedIn, login } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [loginCheckModal, setLoginCheckModal] = useState("");

  useEffect(() => {}, [isLoggedIn]);

  const handleLogin = async (nickname, password) => {
    try {
      const data = await loginUser({ nickname, password }); //api/auth.js로 가져오기
      login(data.nickname, data.id); // ✅ Context의 login 함수로 상태 업데이트
      setOpenModal(false); //모달닫기
      setLoginCheckModal("로그인 성공");
      // window.location.reload();// ✅ reload 없이 상태 반영
    } catch (err) {
      setLoginCheckModal(err.message || "로그인에 실패했습니다.");
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
            투자 현황
          </NavLink>
        </div>
      </div>
      <div>
        {!isLoggedIn && (
          <button
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
        {loginCheckModal && (
          <Modal onClose={() => setLoginCheckModal("")} size="small">
            <div className={styles.checkbox}>
              <div className={styles.checkTitle}>{loginCheckModal}</div>
              <CustomButton
                buttonClass={btnStyle.buttonLarge}
                onClick={() => setLoginCheckModal("")}
              >
                확인
              </CustomButton>
            </div>
          </Modal>
        )}
        <AuthStatus onLogoutSuccess={() => setLogoutModal(true)} />
        {logoutModal && (
          <Modal onClose={() => setLogoutModal(false)} size="small">
            <div className={styles.outModal}>
              <div className={styles.logout}>로그아웃 되었습니다</div>
              <CustomButton
                buttonClass={btnStyle.buttonLarge}
                onClick={() => setLogoutModal(false)}
              >
                확인
              </CustomButton>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
