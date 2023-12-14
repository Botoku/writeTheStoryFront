"use client";
import { useState } from "react";

export default function Accordion(props) {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return (
    <div
      className="border-t-2 border-b duration-500 transition-all hover:border-orange-400"
      style={{
        width: "100%",
        marginBottom: "15px",
        lineHeight: "15px",
        marginTop: "20px",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
    >
      <button
        style={{
          width: "100%",
          position: "relative",
          textAlign: "left",
          padding: "4px",
          border: "none",
          background: "transparent",
          outline: "none",
          cursor: "pointer",
        }}
        onClick={toggle}
        type="button"
      >
        <p className="text-gray-200">{props.title}</p>
      </button>
      <div style={{ display: isShowing ? "block" : "none", padding: "5px" }}>
        {props.content}
      </div>
    </div>
  );
}
