import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        w-12 h-12 rounded-full flex items-center justify-center 
        border border-[rgba(0,234,255,0.4)]
        transition-all backdrop-blur-md
        dark:bg-white/10 dark:text-cyan-300 
        bg-black/10 text-purple-600
        hover:shadow-[0_0_12px_#00eaff]
      "
    >
      {theme === "dark" ? (
        <Sun size={22} className="text-yellow-300" />
      ) : (
        <Moon size={22} className="text-purple-700" />
      )}
    </button>
  );
}
