import React, { useState } from "react";

export const HoverTooltip: React.FC<{
  children: React.ReactNode;
  content: string;
  className?: string;
}> = ({ children, content, className = "" }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <div
        className="absolute z-50 bottom-full left-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg shadow-xl max-w-xs whitespace-normal"
        style={{
          transform: "translateX(-50%)",
          opacity: show ? 1 : 0,
          pointerEvents: show ? "auto" : "none",
          transition: "opacity 0.2s ease",
        }}
      >
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
};
