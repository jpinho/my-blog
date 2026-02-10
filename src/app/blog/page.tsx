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
      <h1 className="mb-8 text-3xl font-bold tracking-tight">All Posts</h1>

      {postsByYear.size === 0 ? (
        <p className="text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
          No posts yet. Start writing!
        </p>
      ) : (
        Array.from(postsByYear.entries()).map(([year, posts]) => (
          <section key={year} className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
              {year}
            </h2>
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </section>
        ))
      )}
    </div>
  );
}
