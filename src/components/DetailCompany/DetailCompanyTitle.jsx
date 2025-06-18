import React from "react";
import { useParams } from "react-router-dom";

export function DetailCompanyTitle({ company }) {
  if (!company) return null;

  return (
    <div>
      <img src="https://picsum.photos/250/250" />
      <div>{company.companyName}</div>
      <div>{company.category}</div>
    </div>
  );
}
