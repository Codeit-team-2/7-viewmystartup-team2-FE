import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import MyCompanyCompare from "./pages/MyCompanyCompare/MyCompanyCompare.jsx";
import MyCompanyResult from "./pages/MyCompanyResult/MyCompanyResult.jsx";
import InvenstmentOverview from "./pages/InvestmentOverview/InvestmentOverview.jsx";
import CompanyDetail from "./pages/CompanyDetail/CompanyDetail.jsx";
import SelectedOverivew from "./pages/SelectedOverivew/SelectedOverivew.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mycompanycompare" element={<MyCompanyCompare />} />
        <Route path="/mycompanyresult" element={<MyCompanyResult />} />
        <Route path="/investmentoverview" element={<InvenstmentOverview />} />
        <Route path="/companydetail" element={<CompanyDetail />} />
        <Route path="/selectedoverview" element={<SelectedOverivew />} />
      </Routes>
    </div>
  );
}

export default App;
