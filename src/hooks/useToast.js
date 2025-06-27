import { useState, useCallback } from "react";

export function useToast() {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // 메시지 띄우는 함수
  const showToastMessage = useCallback(message => {
    setToastMessage(message);
    setShowToast(true);
  }, []);

  // 토스트 닫기 함수
  const closeToast = useCallback(() => setShowToast(false), []);

  return {
    toastMessage,
    showToast,
    showToastMessage,
    closeToast,
    setToastMessage,
    setShowToast,
  };
}
