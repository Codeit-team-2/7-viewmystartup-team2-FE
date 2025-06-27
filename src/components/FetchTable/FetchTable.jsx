import { Link } from "react-router-dom";
import styles from "./FetchTable.module.css";
import React from "react";
import { getCompanyName } from "../../api/company";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../assets/panda_question.svg";
import ToolTip from "../../components/ToolTip/ToolTip";

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
    <table className={`${styles.table} ${styles.landingTable}`}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          const handleRowClick = () => {
            if (tableType === "default") {
              handleCompanyClick(item.companyName);
            }
          };

          return (
            <tr
              key={item.id || index}
              onClick={handleRowClick}
              style={{
                cursor: tableType === "default" ? "pointer" : "default",
              }}
            >
              {columns.map((col) => {
                const cellValue = item[col.key];

                const value =
                  col.key === "rank"
                    ? `${startIndex + index + 1}위`
                    : col.key === "description"
                    ? cellValue
                      ? `${cellValue.slice(0, 60)}...`
                      : ""
                    : cellValue;

                if (col.key === "companyName") {
                  const content = (
                    <div className={styles.namebox}>
                      <div className={styles.imgbox}>
                        <img
                          className={styles.imgbackground}
                          src={item.imgUrl || defaultImg}
                          alt="기업 로고"
                        />
                      </div>
                      <a className={styles.comNameText}>{value}</a>
                    </div>
                  );

                  return (
                    <td key={col.key}>
                      {tableType === "default" ? (
                        <span
                          className={styles.linkLikeText}
                          onClick={(e) => {
                            e.stopPropagation(); // tr 클릭 중복 방지
                            handleCompanyClick(value);
                          }}
                        >
                          {content}
                        </span>
                      ) : (
                        content
                      )}
                    </td>
                  );
                } else if (col.key === "description") {
                  const shortText = cellValue
                    ? `${cellValue.slice(0, 60)}...`
                    : "";

                  return (
                    <td key={col.key}>
                      <ToolTip text={shortText} tooltip={cellValue} />
                    </td>
                  );
                } else {
                  return <td key={col.key}>{value}</td>;
                }
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
