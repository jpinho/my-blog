"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md dark:border-[var(--color-border-dark)] dark:bg-[var(--color-bg-dark)]/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-lg font-bold text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)] dark:text-[var(--color-text-dark)] dark:hover:text-[var(--color-accent-dark)]"
        >
          {siteConfig.author}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                pathname.startsWith(link.href)
                  ? "font-medium text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] dark:text-[var(--color-text-muted-dark)] dark:hover:text-[var(--color-text-dark)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            className="rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] dark:text-[var(--color-text-muted-dark)] dark:hover:bg-[var(--color-surface-dark)]"
            aria-label="Search"
          >
            <Search size={18} />
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile nav toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-[var(--color-border)] px-4 py-3 dark:border-[var(--color-border-dark)] sm:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm ${
                pathname.startsWith(link.href)
                  ? "font-medium text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]"
                  : "text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/search"
            onClick={() => setMobileOpen(false)}
            className="block py-2 text-sm text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]"
          >
            Search
          </Link>
        </nav>
      )}
    </header>
  );
}
