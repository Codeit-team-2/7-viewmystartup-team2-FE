// src/hooks/useLoading.js
import { useState, useCallback } from "react";

export function useFetchLoading() {
  const [isFetchLoading, setIsFetchLoading] = useState(false);

  const startFetchLoading = useCallback(() => setIsFetchLoading(true), []);
  const endFetchLoading = useCallback(() => setIsFetchLoading(false), []);

  //setIsFetchLoading은 외부에서 쓸일 없음 걍 스타트 엔드만 쓸거기때문
  return {
    isFetchLoading,
    startFetchLoading,
    endFetchLoading,
  };
}
