import { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Topics",
  description: "Browse all topics.",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] sm:text-4xl">
          Topics
        </h1>
        <p className="mt-3 text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          Browse posts by topic.
        </p>
      </div>

      {tags.length === 0 ? (
        <p className="py-8 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          No topics yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              href={`/tags/${tag.name}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border-primary)] hover:border-[var(--color-text-tertiary)] rounded-full transition-colors dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)] dark:border-[var(--color-border-primary-dark)] dark:hover:border-[var(--color-text-tertiary-dark)]"
            >
              {tag.name}
              <span className="text-xs text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
