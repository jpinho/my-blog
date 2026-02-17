import { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getPostsByYear } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "All blog posts, organized by year.",
};

export default function BlogPage() {
  const postsByYear = getPostsByYear();

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          A collection of thoughts on engineering, technology, and building things.
        </p>
      </div>

      {postsByYear.size === 0 ? (
        <p className="py-8 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          No posts yet.
        </p>
      ) : (
        <div className="space-y-12">
          {Array.from(postsByYear.entries()).map(([year, posts]) => (
            <section key={year}>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
                  {year}
                </h2>
                <span className="text-xs text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
                  {posts.length} {posts.length === 1 ? "post" : "posts"}
                </span>
              </div>
              <div className="border-t border-[var(--color-border-primary)] dark:border-[var(--color-border-primary-dark)]">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
