import { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse all tags.",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Tags</h1>

      {tags.length === 0 ? (
        <p className="text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
          No tags yet.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              href={`/tags/${tag.name}`}
              className="rounded-full border border-[var(--color-border)] px-4 py-2 text-sm transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] dark:border-[var(--color-border-dark)] dark:hover:border-[var(--color-accent-dark)] dark:hover:text-[var(--color-accent-dark)]"
            >
              #{tag.name}{" "}
              <span className="text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
                ({tag.count})
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
