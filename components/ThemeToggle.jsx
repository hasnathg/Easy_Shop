"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
  onClick={toggle}
  className="rounded border px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
  title={dark ? "Switch to light" : "Switch to dark"}
>
  {dark ? (
    // Sun icon
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 15a5 5 0 100-10 5 5 0 000 10z" />
      <path fillRule="evenodd" d="M10 1a1 1 0 011 1v1a1 1 0 11-2 0V2a1 1 0 011-1zm0 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm9-6a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM4 10a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zm11.657-6.657a1 1 0 010 1.414L15.414 6.0a1 1 0 11-1.414-1.414l1.243-1.243a1 1 0 011.414 0zM6.0 15.414a1 1 0 011.414 0L8.657 16.657a1 1 0 01-1.414 1.414L6.0 16.828a1 1 0 010-1.414zm9.657 1.243a1 1 0 010-1.414L16.828 14a1 1 0 011.414 1.414l-1.243 1.243a1 1 0 01-1.414 0zM4.586 4.586A1 1 0 016 3.172L4.757 1.929A1 1 0 113.343 3.343L4.586 4.586z" clipRule="evenodd" />
    </svg>
  ) : (
    // Moon icon
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M17.293 13.293a8 8 0 11-10.586-10.586A7.002 7.002 0 0010 18a7.002 7.002 0 007.293-4.707z" clipRule="evenodd" />
    </svg>
  )}
</button>
  );
}
