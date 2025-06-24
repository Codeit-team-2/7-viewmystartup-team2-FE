//src/components/Navbar/Navbar.jsx
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import LoginModal from "../Modal/LoginModal";
import { loginUser } from "../../api/auth";
import { useAuth } from "../Contexts/AuthContext";

export default function Navbar() {
  const { isLoggedIn, login } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    }
  }, [isLoggedIn]);

  const handleLogin = async (nickname, password) => {
    try {
      const data = await loginUser({ nickname, password }); //api/auth.js로 가져오기
      login(data.nickname, data.id); // ✅ Context의 login 함수로 상태 업데이트
      alert("로그인 성공!");
      setShowLoginModal(false); //모달닫기
      // window.location.reload();// ✅ reload 없이 상태 반영
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="navArea">
      <NavLink to="/" className="logo" />
      <div>
        <NavLink to="/mycompanycompare" className="navbarPage">
          나의 기업 비교
        </NavLink>
        <NavLink to="/selectedoverview" className="navbarPage">
          비교 현황
        </NavLink>
        <NavLink to="/investmentoverview" className="navbarPage">
          투자 현황
        </NavLink>
        <NavLink to="/companydetailPage/1" className="navbarPage">
          임시 기업상세 페이지
        </NavLink>
      </div>
      <AuthStatus />
      {showLoginModal && <LoginModal onLogin={handleLogin} />}
    </div>
  );
}
