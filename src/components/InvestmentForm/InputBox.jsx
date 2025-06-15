import React from "react";

export function InputBox({
  label,
  value,
  onChange,
  id,
  type,
  placeholder,
  error,
}) {
  return (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        placeholder={placeholder}
      />
      <div>{error}</div>
    </div>
  );
}
