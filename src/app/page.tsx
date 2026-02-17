import Link from "next/link";
import PostCard from "@/components/PostCard";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pb-12">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] sm:text-4xl">
          {siteConfig.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] max-w-[600px] leading-relaxed">
          {siteConfig.description}
        </p>
      </section>

      {/* All posts */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
            Latest posts
          </h2>
          <span className="text-xs text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
            {posts.length} posts
          </span>
        </div>
        <div className="border-t border-[var(--color-border-primary)] dark:border-[var(--color-border-primary-dark)]">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="py-8 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
              No posts yet.
            </p>
          )}
        </div>
        {posts.length > siteConfig.postsPerPage && (
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
            >
              View all posts &rarr;
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
