"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/blog", label: "Blog", shortcut: "B" },
  { href: "/tags", label: "Topics", shortcut: "T" },
  { href: "/about", label: "About", shortcut: "A" },
  { href: "/search", label: "Search", shortcut: "S" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      ) {
        return;
      }

      const link = navLinks.find(
        (l) => l.shortcut.toLowerCase() === e.key.toLowerCase()
      );
      if (link) {
        window.location.href = link.href;
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-border-primary)] dark:bg-[var(--color-bg-dark)]/95 dark:border-[var(--color-border-primary-dark)]">
      <div className="mx-auto flex max-w-[960px] items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)] transition-colors"
          aria-label="Home"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 10.5L10 3.5L17 10.5M5 9V16.5H8.5V12.5H11.5V16.5H15V9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-1.5 text-sm transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] font-medium"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)]"
              }`}
            >
              <span className="kbd opacity-0 group-hover:opacity-100 transition-opacity">[{link.shortcut}]</span>
              {link.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center border-l border-[var(--color-border-primary)] dark:border-[var(--color-border-primary-dark)] pl-4">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile nav toggle */}
        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center h-9 w-9 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-[var(--color-border-primary)] px-6 py-3 dark:border-[var(--color-border-primary-dark)] sm:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 text-sm transition-colors rounded-md ${
                  pathname.startsWith(link.href)
                    ? "text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] font-medium bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
