"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-11 w-11" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center justify-center h-11 w-11 rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border-secondary)] transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:text-[var(--color-text-primary)] hover:shadow-[var(--shadow-soft)] dark:bg-[var(--color-surface-elevated-dark)] dark:border-[var(--color-border-secondary-dark)] dark:text-[var(--color-text-secondary-dark)] dark:hover:bg-[var(--color-hover-dark)] dark:hover:text-[var(--color-text-primary-dark)]"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
