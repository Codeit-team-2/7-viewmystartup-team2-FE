import React from "react";
import { invInitialData } from "../../config/invInitialData_v2.js";
import { useParams } from "react-router-dom";
import { DetailCompanyTitle } from "../../components/DetailCompany/DetailCompanyTitle.jsx";
import { DetailCompanyList } from "../../components/DetailCompany/DetailCompanyList.jsx";
import { DetailCompanyInfor } from "../../components/DetailCompany/DetailCompanyInfor.jsx";

function CompanyDetail() {
  const { id } = useParams();
  const company = invInitialData.find(c => c.id === Number(id));

  return (
    <div>
      <DetailCompanyTitle company={company} />
      <DetailCompanyList company={company} />
      <DetailCompanyInfor company={company} />
      {/* 앱에서 받은 투자  */}
      {/* 기업투자하기 버튼 */}
      {/* 투자한 사람 목록 */}
    </div>
  );
}

export default CompanyDetail;
