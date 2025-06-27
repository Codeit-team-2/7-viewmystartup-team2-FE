import { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import React from "react";

export default function SearchBar({
  onSubmit,
  className = "",
  inputClassName = "",
}) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={input}
        onChange={(e) => {
          const value = e.target.value;
          setInput(value);
          if (value === "") onSubmit("");
        }}
        onKeyDown={handleKeyDown}
        className={`${styles.input} ${inputClassName}`}
      />
      {/* 클릭 가능한 아이콘 */}
      <span className={styles.searchIcon} onClick={handleSubmit}>
        <FaSearch />
      </span>
    </div>
  );
}
