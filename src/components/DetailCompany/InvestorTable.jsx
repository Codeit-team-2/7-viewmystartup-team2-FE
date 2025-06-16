import React, { useState } from "react";
import { investorsListData } from "../../config/investorsListData.js";

function InvestorTable({ companyId, page, pageSize }) {
  const investors = (investorsListData[companyId] || [])
    .slice()
    .sort((a, b) => a.rank - b.rank);

  const start = (page - 1) * pageSize;
  const currentInvestors = investors.slice(start, start + pageSize);

  return (
    <table
      border="1"
      cellPadding="8"
      style={{ width: "100%", margin: "10px 0" }}
    >
      <thead>
        <tr>
          <th>이름</th>
          <th>순위</th>
          <th>투자금액(억)</th>
          <th>투자 코멘트</th>
        </tr>
      </thead>
      <tbody>
        {currentInvestors.map(inv => (
          <tr key={inv.rank}>
            <td>{inv.name}</td>
            <td>{inv.rank}</td>
            <td>{inv.amount}</td>
            <td>{inv.comment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InvestorTable;
