import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, Tag, Play } from "lucide-react";
import { PostMeta } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <article className="group relative rounded-2xl border border-[var(--color-border-secondary)] bg-[var(--color-surface-elevated)] overflow-hidden transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 dark:border-[var(--color-border-secondary-dark)] dark:bg-[var(--color-surface-elevated-dark)] dark:hover:border-[var(--color-primary-dark)] dark:hover:shadow-[var(--shadow-glow-dark)] animate-fade-in cursor-pointer">
        {post.videoThumbnail && (
          <div className="relative h-48 w-full overflow-hidden bg-black">
            <Image
              src={post.videoThumbnail}
              alt={`Video thumbnail for ${post.title}`}
              fill
              className="object-cover opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full bg-black/60 p-3 transition-all duration-300 group-hover:bg-[var(--color-primary)]/90">
                <Play size={24} className="text-white fill-white" />
              </div>
            </div>
          </div>
        )}

        <div className="p-6">
          <h2 className="text-xl font-semibold leading-tight text-[var(--color-text-primary)] transition-colors group-hover:text-[var(--color-primary)] dark:text-[var(--color-text-primary-dark)] dark:group-hover:text-[var(--color-primary-dark)]">
            {post.title}
          </h2>
          {post.description && (
            <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
              {post.description}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
              <Calendar size={14} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
              <Clock size={14} />
              {post.readingTime}
            </span>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-bg-secondary)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white dark:bg-[var(--color-bg-secondary-dark)] dark:text-[var(--color-text-tertiary-dark)] dark:hover:bg-[var(--color-primary-dark)] pointer-events-none"
                >
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 transition-opacity duration-300 group-hover:opacity-[0.02] dark:group-hover:opacity-[0.05] pointer-events-none"></div>
      </article>
    </Link>
  );
}