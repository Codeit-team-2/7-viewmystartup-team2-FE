import { createContext, useContext, useState } from "react";

const CompareCompanyContext = createContext();

export function CompareCompanyProvider({ defaultValue = [], children }) {
  const [isCompareCompany, setIsCompareCompany] = useState(false);
  const [compareCompany, setCompareCompany] = useState(defaultValue);

  return (
    <CompareCompanyContext.Provider
      value={{
        isCompareCompany,
        setIsCompareCompany,
        compareCompany,
        setCompareCompany,
      }}
    >
      {children}
    </CompareCompanyContext.Provider>
  );
}

export function useCompareCompany() {
  const context = useContext(CompareCompanyContext);

  if (!context) {
    throw new Error("해당 훅은 Context 안에서 사용해야 합니다.");
  }

  return context.compareCompany;
}

export function useSetCompareCompany() {
  const context = useContext(CompareCompanyContext);

  if (!context) {
    throw new Error("해당 훅은 Context 안에서 사용해야 합니다.");
  }

  return context.setCompareCompany;
}

export function useIsCompareCompany() {
  const context = useContext(CompareCompanyContext);

  if (!context) {
    throw new Error("해당 훅은 Context 안에서 사용해야 합니다.");
  }

  return context.isCompareCompany;
}

export function useSetIsCompareCompany() {
  const context = useContext(CompareCompanyContext);

  if (!context) {
    throw new Error("해당 훅은 Context 안에서 사용해야 합니다.");
  }

  return context.setIsCompareCompany;
}
