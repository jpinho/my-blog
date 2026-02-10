import Link from "next/link";
import { Github, Twitter, Linkedin, Rss } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)]">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between">
        <p className="text-sm text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
          &copy; {new Date().getFullYear()} {siteConfig.author}. All rights
          reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] dark:text-[var(--color-text-muted-dark)] dark:hover:text-[var(--color-text-dark)]"
            aria-label="GitHub"
          >
            <Github size={18} />
          </Link>
          <Link
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] dark:text-[var(--color-text-muted-dark)] dark:hover:text-[var(--color-text-dark)]"
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </Link>
          <Link
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] dark:text-[var(--color-text-muted-dark)] dark:hover:text-[var(--color-text-dark)]"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </Link>
          <Link
            href="/rss.xml"
            className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] dark:text-[var(--color-text-muted-dark)] dark:hover:text-[var(--color-text-dark)]"
            aria-label="RSS Feed"
          >
            <Rss size={18} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
