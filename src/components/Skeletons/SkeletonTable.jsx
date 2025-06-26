// src/components/Skeletons/SkeletonTable.jsx
import React from "react";
import styles from "./SkeletonTable.module.css";

export default function SkeletonTable({ rows = 5 }) {
  return (
    <table className={styles.skeletonTable}>
      <thead>
        <tr>{/* <th colSpan="7">로딩 중...</th> */}</tr>
      </thead>
      <tbody>
        {[...Array(rows)].map((_, i) => (
          <tr key={i}>
            {Array.from({ length: 5 }).map((_, j) => (
              <td key={j}>
                <div className={styles.skeletonCell}></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
