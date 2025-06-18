// src/components/SearchBar/SearchBar.jsx
import { useState } from "react";
import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import React from "react";

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState(""); //현재 내 input태그에 쓰여지고 있는 상태

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input.trim()); //search(input.trim) -> search(keyword) 여기서 input이 keyword됨
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  console.log("현재input : ", input);

  return (
    <div className={styles.searchBar}>
      <button onClick={handleSubmit} className={styles.button}>
        <FaSearch />
      </button>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
    </div>
  );
}
