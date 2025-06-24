import { Link } from "react-router-dom";
import styles from "./FetchTable.module.css";
import React from "react";
import { getCompanyName } from "../../api/company";
import { useNavigate } from "react-router-dom";

// FetchTable 사용방법 프롭스에  tableType 이걸 아무값을 넣으면 기업명에서 Link to 기능비활성화, 기본값은 상세페이지이동
// <FetchTable 예시 비활성화
//     data={currentPageData}
//     columns={LandingPageColumns}
//     startIndex={startIndex}
//     tableType="asd" // 여기서 아무값을
//   />

// 여기서 기업명을 클릭했을때 api요청으로 기업아이디와 일치하는 기업 id값을 받아야함

//
export default function FetchTable({
  data = [],
  columns,
  startIndex = 0,
  tableType = "default",
}) {
  const navigate = useNavigate();
  const handleCompanyClick = async (companyName) => {
    console.log("getCompanyName 호출, companyName:", companyName);
    const companyId = await getCompanyName(companyName);
    if (companyId) {
      navigate(`/company/${companyId}`);
    } else {
      console.log(companyId);
      alert("해당 회사 정보를 찾을 수 없습니다.");
    }
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id || index}>
            {columns.map((col) => {
              const cellValue = item[col.key];

              // description이 없을 때 빈 문자열 처리
              const value =
                col.key === "rank"
                  ? `${startIndex + index + 1}위`
                  : col.key === "description"
                  ? cellValue
                    ? `${cellValue.slice(0, 60)}...`
                    : ""
                  : cellValue;

              if (tableType === "default" && col.key === "companyName") {
                return (
                  <td key={col.key}>
                    <span
                      className={styles.linkLikeText}
                      onClick={() => {
                        console.log("지금 오류난곳값제대로들어감?", value);
                        handleCompanyClick(value);
                      }}
                    >
                      {value}
                    </span>
                  </td>
                );
              } else {
                return <td key={col.key}>{value}</td>;
              }
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
