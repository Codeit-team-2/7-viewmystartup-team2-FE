import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import rainbowcat from "../../assets/catcursor.json";

const CELL_SIZE = 30;
const MAX_CELLS = 200;

const ColorCell = React.memo(({ left, top, size, color }) => (
  <div
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

  // Map: key = "cellX,cellY", value = {cellX, cellY, color}
  const [coloredCellsMap, setColoredCellsMap] = useState(new Map());

  const markCell = (x, y) => {
    const cellX = Math.floor(x / CELL_SIZE);
    const cellY = Math.floor(y / CELL_SIZE);
    const key = `${cellX},${cellY}`;

    setColoredCellsMap(prev => {
      if (prev.has(key)) return prev; // 이미 있음, 추가 안함

      const newMap = new Map(prev);
      const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`;
      newMap.set(key, { cellX, cellY, color });

      // 최대 셀 개수 제한
      if (newMap.size > MAX_CELLS) {
        const firstKey = newMap.keys().next().value; // 가장 오래된 셀
        newMap.delete(firstKey);
      }

      return newMap;
    });
  };

  useEffect(() => {
    const handleKeyDown = e => {
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

    const handleKeyUp = e => {
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
    const lottieWidth = 200;
    const lottieHeight = 200;

    let animationFrameId;

    const animate = () => {
      const keys = pressedKeysRef.current;
      const pos = posRef.current;
      let moved = false;

      if (keys.has("ArrowUp")) {
        pos.y = pos.y - speed;
        moved = true;
      }
      if (keys.has("ArrowDown")) {
        pos.y = pos.y + speed;
        moved = true;
      }
      if (keys.has("ArrowLeft")) {
        pos.x = pos.x - speed;
        moved = true;
      }
      if (keys.has("ArrowRight")) {
        pos.x = pos.x + speed;
        moved = true;
      }

      if (moved) {
        markCell(pos.x + lottieWidth / 2, pos.y + lottieHeight / 2);
        setRenderTick(v => v + 1);
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
        height: 400,
        border: "1px solid #ddd",
        overflow: "hidden",
      }}
      tabIndex={0}
    >
      <button
        onClick={() => {
          posRef.current = { x: 0, y: 0 };
          setColoredCellsMap(new Map());
          setRenderTick((v) => v + 1);
        }}
      >
        초기화
      </button>
      <button
        onClick={() => {
          document.querySelector("._loginBtn_fepkq_81")?.click();
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

      <Lottie
        animationData={rainbowcat}
        loop
        autoplay
        style={{
          position: "absolute",
          background: "transparent",
          width: 200,
          height: 200,
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
