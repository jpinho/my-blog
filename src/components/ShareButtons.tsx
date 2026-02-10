"use client";

import { Twitter, Linkedin, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
        Share:
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] dark:text-[var(--color-text-muted-dark)] dark:hover:bg-[var(--color-surface-dark)] dark:hover:text-[var(--color-text-dark)]"
        aria-label="Share on Twitter"
      >
        <Twitter size={16} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] dark:text-[var(--color-text-muted-dark)] dark:hover:bg-[var(--color-surface-dark)] dark:hover:text-[var(--color-text-dark)]"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} />
      </a>
      <button
        onClick={copyLink}
        className="rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface)] hover:text-[var(--color-text)] dark:text-[var(--color-text-muted-dark)] dark:hover:bg-[var(--color-surface-dark)] dark:hover:text-[var(--color-text-dark)]"
        aria-label="Copy link"
      >
        <LinkIcon size={16} />
      </button>
      {copied && (
        <span className="text-xs text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">
          Copied!
        </span>
      )}
    </div>
  );
}
