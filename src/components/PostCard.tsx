import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";
import { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group border-b border-[var(--color-border)] py-6 last:border-0 dark:border-[var(--color-border-dark)]">
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="text-xl font-semibold text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)] dark:text-[var(--color-text-dark)] dark:group-hover:text-[var(--color-accent-dark)]">
          {post.title}
        </h2>
        {post.description && (
          <p className="mt-2 text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
            {post.description}
          </p>
        )}
      </Link>
      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {post.readingTime}
        </span>
        {post.tags.length > 0 && (
          <span className="flex items-center gap-1">
            <Tag size={14} />
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag.toLowerCase()}`}
                className="transition-colors hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)]"
              >
                #{tag}
              </Link>
            ))}
          </span>
        )}
      </div>
    </article>
  );
}
