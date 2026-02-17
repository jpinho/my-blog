import Link from "next/link";
import { PostMeta } from "@/lib/posts";
import { formatDateCompact } from "@/lib/utils";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="flex flex-col sm:flex-row gap-1 sm:gap-8 py-5 border-b border-[var(--color-border-secondary)] dark:border-[var(--color-border-secondary-dark)] last:border-b-0">
        <div className="shrink-0 w-[100px]">
          <time className="text-sm tabular-nums text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
            {formatDateCompact(post.date)}
          </time>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] group-hover:text-[var(--color-primary)] dark:group-hover:text-[var(--color-primary-dark)] transition-colors leading-snug">
            {post.title}
          </h3>

          {post.description && (
            <p className="mt-1.5 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] leading-relaxed line-clamp-2">
              {post.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
              {post.readingTime}
            </span>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-[var(--color-border-primary)] dark:border-[var(--color-border-primary-dark)] px-2.5 py-0.5 text-xs text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden sm:flex items-start pt-1">
          <span className="text-sm text-[var(--color-text-tertiary)] group-hover:text-[var(--color-primary)] dark:text-[var(--color-text-tertiary-dark)] dark:group-hover:text-[var(--color-primary-dark)] transition-colors">
            Read
          </span>
        </div>
      </article>
    </Link>
  );
}
