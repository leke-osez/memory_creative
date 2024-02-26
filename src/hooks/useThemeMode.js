"use client";
import { useEffect, useState } from "react";

const useThemeHook = () => {
  const [getTheme, setTheme] = useState(
    localStorage.getItem("theme") ?? "light"
  );

  const configTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const clearTheme = () => {
    setTheme("");
    localStorage.removeItem("theme");
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      configTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      configTheme("light");
    }
  }, [getTheme]);

  return { getTheme, setTheme, configTheme, clearTheme };
};

export default useThemeHook;
