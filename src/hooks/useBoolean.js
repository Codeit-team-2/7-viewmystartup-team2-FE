// true와 false값을 조정하기 위한 훅.
// isBoolean 스테이트와 switchBoolean 함수를 리턴한다.
// 초기값을 true 혹은 false 중 원하는 값으로 입력하고,
// 리턴되는 switchBoolean 함수를 실행하면 isBoolean이 반대값으로 바뀐다(true에서 false로, false에서 true로)

import { useState } from "react";

function useBoolean(value) {
  const [isBoolean, setIsBoolean] = useState(Boolean(value));
  function switchBoolean() {
    if (isBoolean) {
      setIsBoolean(false);
    } else {
      setIsBoolean(true);
    }
  }

  return [isBoolean, switchBoolean];
}

export default useBoolean;
