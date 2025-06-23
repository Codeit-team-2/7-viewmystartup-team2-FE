//src/components/Navbar/Navbar.jsx
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import AuthStatus from "./AuthStatus";
import LoginModal from "../Modal/LoginModal";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const { isLoggedIn } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    }
  }, [isLoggedIn]);

  const handleLogin = async (nickname, password) => {
    try {
      const data = await loginUser({ nickname, password });
      localStorage.setItem("nickname", data.nickname);
      localStorage.setItem("userId", data.id);
      alert("로그인 성공!");
      setShowLoginModal(false);
      window.location.reload();
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
