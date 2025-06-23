import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import MyCompanyCompare from "./pages/MyCompanyCompare/MyCompanyCompare.jsx";
import MyCompanyResult from "./pages/MyCompanyResult/MyCompanyResult.jsx";
import CompanyDetailPage from "./pages/CompanyDetailPage/CompanyDetailPage.jsx";
import InvestmentOverviewPage from "./pages/InvestmentOverviewPage/InvestmentOverviewPage.jsx";
import SelectedOverviewPage from "./pages/SelectedOverviewPage/SelectedOverviewPage.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mycompanycompare" element={<MyCompanyCompare />} />
        <Route path="/mycompanyresult" element={<MyCompanyResult />} />
        <Route
          path="/investmentoverview"
          element={<InvestmentOverviewPage />}
        />
        <Route path="/companydetailpage/:id" element={<CompanyDetailPage />} />
        <Route path="/selectedoverview" element={<SelectedOverviewPage />} />
      </Routes>
    </div>
  );
}

export default App;
