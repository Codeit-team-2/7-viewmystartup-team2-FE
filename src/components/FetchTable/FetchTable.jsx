import styles from "./FetchTable.module.css";
import React from "react";

export default function FetchTable({ data = [], columns, startIndex = 0 }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id || index}>
            {columns.map(col => {
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

              return <td key={col.key}>{value}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
