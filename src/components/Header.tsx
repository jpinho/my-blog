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
    <header className="sticky top-0 z-50 glass-surface border-b border-[var(--color-border-primary)] dark:border-[var(--color-border-primary-dark)]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 text-xl font-bold text-[var(--color-text-primary)] transition-all duration-300 hover:text-[var(--color-primary)] dark:text-[var(--color-text-primary-dark)] dark:hover:text-[var(--color-primary-dark)]"
        >
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] p-0.5 shadow-sm">
              <div className="h-full w-full rounded-[calc(var(--radius-xl)-2px)] bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] flex items-center justify-center">
                <span className="text-sm font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">
                  {siteConfig.author.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-20"></div>
          </div>
          <span className="group-hover:tracking-wide transition-all duration-300 font-medium">
            {siteConfig.author}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 sm:flex">
          <div className="flex items-center gap-1 rounded-2xl bg-[var(--color-surface-elevated)] p-1.5 shadow-[var(--shadow-soft)] border border-[var(--color-border-secondary)] dark:bg-[var(--color-surface-elevated-dark)] dark:border-[var(--color-border-secondary-dark)]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-xl ${
                  pathname.startsWith(link.href)
                    ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-soft)] dark:bg-[var(--color-primary-dark)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover-light)] dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)] dark:hover:bg-[var(--color-hover-dark)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 ml-1">
            <Link
              href="/search"
              className="flex items-center justify-center h-11 w-11 rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border-secondary)] transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:text-[var(--color-text-primary)] hover:shadow-[var(--shadow-soft)] dark:bg-[var(--color-surface-elevated-dark)] dark:border-[var(--color-border-secondary-dark)] dark:text-[var(--color-text-secondary-dark)] dark:hover:bg-[var(--color-hover-dark)] dark:hover:text-[var(--color-text-primary-dark)]"
              aria-label="Search"
            >
              <Search size={18} />
            </Link>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile nav toggle */}
        <div className="flex items-center gap-3 sm:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center h-11 w-11 rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border-secondary)] transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:text-[var(--color-text-primary)] dark:bg-[var(--color-surface-elevated-dark)] dark:border-[var(--color-border-secondary-dark)] dark:text-[var(--color-text-secondary-dark)] dark:hover:bg-[var(--color-hover-dark)] dark:hover:text-[var(--color-text-primary-dark)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-[var(--color-border-primary)] px-6 py-4 backdrop-blur-md bg-[var(--color-surface-glass)] dark:bg-[var(--color-surface-glass-dark)] dark:border-[var(--color-border-primary-dark)] sm:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  pathname.startsWith(link.href)
                    ? "bg-[var(--color-primary)] text-white shadow-sm dark:bg-[var(--color-primary-dark)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover-light)] dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)] dark:hover:bg-[var(--color-hover-dark)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-hover-light)] rounded-xl transition-all duration-300 dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)] dark:hover:bg-[var(--color-hover-dark)]"
            >
              Search
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
