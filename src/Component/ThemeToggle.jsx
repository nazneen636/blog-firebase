import { useState, useEffect } from "react";
import { MdNightlight, MdOutlineLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDark(saved);
    document.documentElement.classList.toggle("dark", saved);
  }, []);

  const toggleTheme = () => {
    const newMode = !dark;
    setDark(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button onClick={toggleTheme} className="">
      {dark ? <MdNightlight className="text-2xl text-orange-500" /> : <MdOutlineLightMode className="text-2xl text-orange-500" />}
    </button>
  );
};

export default ThemeToggle;