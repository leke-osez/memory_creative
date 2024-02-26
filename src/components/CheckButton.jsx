import { Check } from "@mui/icons-material";
import React from "react";

const CheckButton = ({ onClick, children, themeColor, isChecked }) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-3"
      style={{ color: themeColor }}
    >
      <p
        style={{ color: themeColor }}
        className={`${isChecked ? "font-bold" : ""} hover:scale-[1.20]`}
      >
        {children}
      </p>
      {isChecked && <Check />}
    </button>
  );
};

export default CheckButton;
