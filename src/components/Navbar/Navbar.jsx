import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
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
    </div>
  );
}

export default Navbar;
