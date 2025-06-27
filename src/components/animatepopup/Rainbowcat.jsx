import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import rainbowcat from "../../assets/catcursor.json";

export default function MultiKeyMovableRainbowCat() {
  const posRef = useRef({ x: 0, y: 0 });
  const [renderTick, setRenderTick] = useState(0);

  const pressedKeysRef = useRef(new Set());

  // 방향 뒤집기 여부를 상태로 관리
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        pressedKeysRef.current.add(e.key);
        e.preventDefault();

        // 방향 바뀌었을 때 상태 업데이트
        if (e.key === "ArrowLeft") {
          setIsFlipped(true);
        } else if (e.key === "ArrowRight") {
          setIsFlipped(false);
        }
      }
    };

    const handleKeyUp = (e) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        pressedKeysRef.current.delete(e.key);
        e.preventDefault();

        // 왼쪽/오른쪽 키 뗐을 때 현재 눌린 키 중 방향 결정
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          const keys = pressedKeysRef.current;
          if (keys.has("ArrowLeft")) {
            setIsFlipped(true);
          } else if (keys.has("ArrowRight")) {
            setIsFlipped(false);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const speed = 5;

    let animationFrameId;

    const animate = () => {
      const keys = pressedKeysRef.current;
      const pos = posRef.current;
      let moved = false;

      if (keys.has("ArrowUp")) {
        pos.y = Math.max(0, pos.y - speed);
        moved = true;
      }
      if (keys.has("ArrowDown")) {
        pos.y = pos.y + speed;
        moved = true;
      }
      if (keys.has("ArrowLeft")) {
        pos.x = Math.max(0, pos.x - speed);
        moved = true;
      }
      if (keys.has("ArrowRight")) {
        pos.x = pos.x + speed;
        moved = true;
      }

      if (moved) {
        setRenderTick((v) => v + 1);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        border: "1px solid #ddd",
        overflow: "hidden",
      }}
      tabIndex={0}
    >
      <Lottie
        animationData={rainbowcat}
        loop
        autoplay
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          left: posRef.current.x,
          top: posRef.current.y,
          cursor: "grab",
          userSelect: "none",
          transform: isFlipped ? "scaleX(-1)" : "scaleX(1)",
          transition: "transform 0.2s ease",
        }}
      />
    </div>
  );
}
