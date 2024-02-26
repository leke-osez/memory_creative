import React from "react";

const Button = ({ children, onClick, themeColor, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${className} px-3 py-2 rounded-lg font-bold text-white `}
      style={{ backgroundColor: themeColor }}
    >
      {children}
    </button>
  );
};

export default Button;
