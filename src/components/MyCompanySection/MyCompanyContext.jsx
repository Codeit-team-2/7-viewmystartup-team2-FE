import { createContext, useContext, useState } from "react";
import React from "react";

const MyCompanyContext = createContext();

export function MyCompanyProvider({ defaultValue = {}, children }) {
  const [myCompany, setMyCompany] = useState(defaultValue);
  const [isMyCompany, setIsMyCompany] = useState(false);

  return (
    <MyCompanyContext.Provider
      value={{ myCompany, setMyCompany, isMyCompany, setIsMyCompany }}
    >
      {children}
    </MyCompanyContext.Provider>
  );
}

export function useMyCompany() {
  const context = useContext(MyCompanyContext);

  if (!context) {
    throw new Error("해당 훅은 Context 안에서 사용해야 합니다.");
  }

  return context.myCompany;
}

export function useSetMyCompany() {
  const context = useContext(MyCompanyContext);

  if (!context) {
    throw new Error("해당 훅은 Context 안에서 사용해야 합니다.");
  }

  return context.setMyCompany;
}

export function useIsMyCompany() {
  const context = useContext(MyCompanyContext);

  if (!context) {
    throw new Error("해당 훅은 Context 안에서 사용해야 합니다.");
  }

  return context.isMyCompany;
}

export function useSetIsMyCompany() {
  const context = useContext(MyCompanyContext);

  if (!context) {
    throw new Error("해당 훅은 Context 안에서 사용해야 합니다.");
  }

  return context.setIsMyCompany;
}
