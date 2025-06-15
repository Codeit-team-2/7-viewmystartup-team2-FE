import React, { useState } from "react";
import { invInitialData } from "../../config/invInitialData_v2.js";
import { investorsListData } from "../../config/investorsListData.js";
import { useParams } from "react-router-dom";
import { DetailCompanyTitle } from "../../components/DetailCompany/DetailCompanyTitle.jsx";
import { DetailCompanyList } from "../../components/DetailCompany/DetailCompanyList.jsx";
import { DetailCompanyInfor } from "../../components/DetailCompany/DetailCompanyInfor.jsx";
import InvestmentForm from "../../components/InvestmentForm/InvestmentForm.jsx";
import InvestorTable from "../../components/DetailCompany/InvestorTable.jsx";
import { usePagination } from "../../hooks/usePagination.js";
import PaginationBtn from "../../components/DetailCompany/PaginationBtn.jsx";

function CompanyDetail() {
  const { id } = useParams();
  const company = invInitialData.find(c => c.id === Number(id));
  const companyId = company.id;
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const totalCount = (investorsListData[companyId] || []).length;

  const { pageNumbers, hasPrev, hasNext, handlePageChange } = usePagination({
    page,
    setPage,
    totalCount,
    pageSize,
  });

  return (
    <div>
      <DetailCompanyTitle company={company} />
      <DetailCompanyList company={company} />
      <DetailCompanyInfor company={company} />
      <InvestmentForm company={company} />
      <InvestorTable companyId={companyId} page={page} pageSize={pageSize} />
      <PaginationBtn
        page={page}
        pageNumbers={pageNumbers}
        hasPrev={hasPrev}
        hasNext={hasNext}
        handlePageChange={handlePageChange}
      />
      {/* 앱에서 받은 투자  */}
      {/* 기업투자하기 버튼 */}
      {/* 투자한 사람 목록 */}
    </div>
  );
}

export default CompanyDetail;
