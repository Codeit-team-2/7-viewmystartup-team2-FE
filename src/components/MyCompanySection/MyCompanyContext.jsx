import { createContext, useContext, useState } from "react";

const MyCompanyContext = createContext();

export function MyCompanyProvider({ defaultValue = {}, children }) {
  const [myCompany, setMyCompany] = useState(defaultValue);

  return (
    <MyCompanyContext.Provider value={{ myCompany, setMyCompany }}>
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
