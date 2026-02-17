import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border-primary)] dark:border-[var(--color-border-primary-dark)]">
      <div className="mx-auto flex max-w-[960px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
          <Link
            href="/blog"
            className="hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            About
          </Link>
          <Link
            href="/tags"
            className="hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            Topics
          </Link>
          <Link
            href="/rss.xml"
            className="hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            RSS
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            X
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            LinkedIn
          </a>
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.author}
          </span>
        </div>
      </div>
    </footer>
  );
}
