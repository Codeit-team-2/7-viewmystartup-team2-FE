import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navArea">
      <div className="logo" />
      <div>
        <NavLink to="/myEntList" className="navbarPage">
          나의 기업 비교
        </NavLink>
        <NavLink to="/comparisonList" className="navbarPage">
          비교 현황
        </NavLink>
        <NavLink to="/investmentoverview" className="navbarPage">
          투자 현황
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
