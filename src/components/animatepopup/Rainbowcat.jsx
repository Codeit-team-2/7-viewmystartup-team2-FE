import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import rainbowcat from "../../assets/catcursor.json";
import styles from "./Rainbowcat.module.css";

const CELL_SIZE = 20;
const MAX_CELLS = 1800;
const containerWidth = 1200; // 원하는 크기로 설정(400~1000px 등)
const containerHeight = 600;
const lottieWidth = 100;
const lottieHeight = 100;

const ColorCell = React.memo(({ left, top, size, color }) => (
  <div
    className={styles.area}
    style={{
      position: "absolute",
      left,
      top,
      width: size,
      height: size,
      backgroundColor: color,
      pointerEvents: "none",
      opacity: 0.7,
      transition: "background-color 0.3s ease",
    }}
  />
));

export default function MultiKeyMovableRainbowCat() {
  const posRef = useRef({ x: 0, y: 0 });
  const [renderTick, setRenderTick] = useState(0);
  const pressedKeysRef = useRef(new Set());
  const [isFlipped, setIsFlipped] = useState(false);

  const [coloredCellsMap, setColoredCellsMap] = useState(new Map());

  const markCell = (x, y) => {
    const cellX = Math.floor(x / CELL_SIZE);
    const cellY = Math.floor(y / CELL_SIZE);
    const key = `${cellX},${cellY}`;

    setColoredCellsMap((prev) => {
      if (prev.has(key)) return prev;
      const newMap = new Map(prev);
      const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`;
      newMap.set(key, { cellX, cellY, color });
      if (newMap.size > MAX_CELLS) {
        const firstKey = newMap.keys().next().value;
        newMap.delete(firstKey);
      }
      return newMap;
    });
  };

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

        if (e.key === "ArrowLeft") setIsFlipped(true);
        else if (e.key === "ArrowRight") setIsFlipped(false);
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

        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          const keys = pressedKeysRef.current;
          if (keys.has("ArrowLeft")) setIsFlipped(true);
          else if (keys.has("ArrowRight")) setIsFlipped(false);
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

      let nextX = pos.x;
      let nextY = pos.y;

      if (keys.has("ArrowUp")) {
        nextY = Math.max(0, pos.y - speed);
        moved = true;
      }
      if (keys.has("ArrowDown")) {
        nextY = Math.min(containerHeight - lottieHeight, pos.y + speed);
        moved = true;
      }
      if (keys.has("ArrowLeft")) {
        nextX = Math.max(0, pos.x - speed);
        moved = true;
      }
      if (keys.has("ArrowRight")) {
        nextX = Math.min(containerWidth - lottieWidth, pos.x + speed);
        moved = true;
      }

      // posRef를 직접 수정
      if (moved) {
        pos.x = nextX;
        pos.y = nextY;
        markCell(pos.x + lottieWidth / 2, pos.y + lottieHeight / 2);
        setRenderTick((v) => v + 1);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className={styles.box} tabIndex={0}>
      <div className={styles.btnArea}>
        <button
          className={styles.btn}
          onClick={() => {
            posRef.current = { x: 0, y: 0 };
            setColoredCellsMap(new Map());
            setRenderTick((v) => v + 1);
          }}
        >
          초기화
        </button>
        <button
          className={styles.btn}
          onClick={() => {
            document.getElementById("login-button")?.click();
          }}
        >
          슈퍼고양이모드
        </button>
        {[...coloredCellsMap.values()].map(({ cellX, cellY, color }) => (
          <ColorCell
            key={`${cellX}-${cellY}`}
            left={cellX * CELL_SIZE}
            top={cellY * CELL_SIZE}
            size={CELL_SIZE}
            color={color}
          />
        ))}
      </div>

      <Lottie
        animationData={rainbowcat}
        loop
        autoplay
        style={{
          position: "absolute",
          background: "transparent",
          width: lottieWidth,
          height: lottieHeight,
          left: posRef.current.x,
          top: posRef.current.y,
          cursor: "grab",
          userSelect: "none",
          transform: isFlipped ? "scaleX(-1)" : "scaleX(1)",
          transition: "transform 0.2s ease",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
