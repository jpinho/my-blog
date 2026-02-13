import Link from "next/link";
import { Github, Twitter, Linkedin, Rss } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] dark:border-[var(--color-border-primary-dark)] dark:bg-[var(--color-bg-secondary-dark)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:justify-between lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <p className="text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            &copy; {new Date().getFullYear()} {siteConfig.author}
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
            Built with Next.js and Tailwind CSS
          </p>
        </div>

        <div className="flex items-center gap-1">
          {[
            { href: siteConfig.social.github, icon: Github, label: "GitHub" },
            { href: siteConfig.social.twitter, icon: Twitter, label: "Twitter" },
            { href: siteConfig.social.linkedin, icon: Linkedin, label: "LinkedIn" },
            { href: "/rss.xml", icon: Rss, label: "RSS Feed" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center justify-center h-10 w-10 rounded-xl bg-[var(--color-surface-elevated)] text-[var(--color-text-tertiary)] border border-[var(--color-border-secondary)] transition-all duration-300 hover:bg-[var(--color-hover-light)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-accent)] dark:bg-[var(--color-surface-elevated-dark)] dark:border-[var(--color-border-secondary-dark)] dark:text-[var(--color-text-tertiary-dark)] dark:hover:bg-[var(--color-hover-dark)] dark:hover:text-[var(--color-text-primary-dark)] dark:hover:border-[var(--color-border-accent-dark)]"
              aria-label={label}
            >
              <Icon size={16} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
