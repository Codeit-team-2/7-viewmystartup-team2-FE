// src/components/Modal/LoginModal.jsx
import React, { useState } from "react";
import styles from "./LoginInput.module.css";
import CustomButton from "../customTag/customButton/customButton";
import btnStyle from "../customTag/customButton/customButton.module.css";
import { useFetchLoading } from "../../hooks/useFetchLoading";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function LoginModal({ onLogin }) {
  const { isFetchLoading, startFetchLoading, endFetchLoading } =
    useFetchLoading();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    startFetchLoading();
    try {
      await onLogin(nickname, password);
    } catch (err) {
      alert("로그인 실패: " + err.message);
    } finally {
      endFetchLoading();
    }
  };

  return (
    <div className={styles.area}>
      <h2 className={styles.title}>로그인</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isFetchLoading ? (
          <LoadingSpinner />
        ) : (
          <CustomButton buttonClass={btnStyle.buttonLarge} type="submit">
            로그인
          </CustomButton>
        )}
      </form>
    </div>
  );
}
