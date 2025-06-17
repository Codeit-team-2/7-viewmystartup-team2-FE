
import React, { useEffect, useRef, useState } from "react";
import icSelectDot from "../../assets/ic_selectDot.svg";

function InvestorSelectBtn({ investor, onAction }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref}>
      <button onClick={() => setOpen(v => !v)}>
        <img src={icSelectDot} alt="옵션" />
      </button>
      {open && (
        <div>
          <button
            onClick={() => {
              onAction && onAction("edit", investor);
              setOpen(false);
            }}
          >
            수정하기
          </button>
          <button
            onClick={() => {
              onAction && onAction("delete", investor);
              setOpen(false);
            }}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
}

export default InvestorSelectBtn;

