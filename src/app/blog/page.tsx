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
    <div>
      <div className="relative mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] sm:text-5xl">
          All Posts
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          A collection of thoughts on engineering, technology, and building things.
        </p>
      </div>

      {postsByYear.size === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            No posts yet. Start writing!
          </p>
        </div>
      ) : (
        <div className="space-y-16">
          {Array.from(postsByYear.entries()).map(([year, posts]) => (
            <section key={year}>
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
                  {year}
                </h2>
                <div className="flex-1 h-px bg-[var(--color-border-primary)] dark:bg-[var(--color-border-primary-dark)]"></div>
              </div>
              <div className="space-y-6">
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
