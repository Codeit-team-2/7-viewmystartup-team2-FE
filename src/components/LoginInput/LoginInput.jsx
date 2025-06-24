// src/components/Modal/LoginModal.jsx
import React, { useState } from "react";
import styles from "./LoginInput.module.css";
import CustomButton from "../customTag/customButton/customButton";
import btnStyle from "../customTag/customButton/customButton.module.css";

export default function LoginModal({ onLogin }) {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(nickname, password);
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
          onChange={e => setNickname(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <CustomButton buttonClass={btnStyle.buttonLarge} type="submit">
          로그인
        </CustomButton>
      </form>
    </div>
  );
}
