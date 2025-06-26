// AnimatedPopup.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import animationData from "../../assets/AnimationCat.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useLocation } from "react-router-dom";
import style from "./AnimatePopup.module.css";

const directions = ["top", "bottom", "left", "right"];

const AnimatedPopup = () => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [direction, setDirection] = useState("bottom");
  const location = useLocation();

  useEffect(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const chosenDirection =
      directions[Math.floor(Math.random() * directions.length)];
    setDirection(chosenDirection);

    let pos = {};
    switch (chosenDirection) {
      case "top":
        pos = {
          top: "0px",
          left: `${Math.floor(Math.random() * (vw - 100))}px`,
        };
        break;
      case "bottom":
        pos = {
          top: `${vh - 100}px`,
          left: `${Math.floor(Math.random() * (vw - 100))}px`,
        };
        break;
      case "left":
        pos = {
          top: `${Math.floor(Math.random() * (vh - 100))}px`,
          left: "0px",
        };
        break;
      case "right":
        pos = {
          top: `${Math.floor(Math.random() * (vh - 100))}px`,
          left: `${vw - 100}px`,
        };
        break;
    }
    setPosition(pos);

    const timerIn = setTimeout(() => setShow(true), 500);
    const timerOut = setTimeout(() => setShow(false), 3900);

    return () => {
      clearTimeout(timerIn);
      clearTimeout(timerOut);
    };
  }, [location.pathname]);

  const getTransform = () => {
    switch (direction) {
      case "top":
        return "rotate(180deg)";
      case "left":
        return "rotate(90deg)";
      case "right":
        return "rotate(-90deg)";
      default:
        return "none";
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={style.yourAnimationClass}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            ...position,
            zIndex: 1000,
            width: "100px",
            height: "100px",
            backgroundColor: "transparent",
          }}
        >
          <Player
            className="forceTransparent"
            autoplay
            loop
            src={animationData}
            style={{
              height: "100px",
              width: "100px",
              transform: getTransform(),
              backgroundColor: "transparent",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedPopup;
