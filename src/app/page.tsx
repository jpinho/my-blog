import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostCard from "@/components/PostCard";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

export default function Home() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts();
  const recent = posts.slice(0, siteConfig.postsPerPage);

  return (
    <div>
      {/* Hero */}
      <section className="pb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Hey, I&apos;m{" "}
          <span className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">
            {siteConfig.author}
          </span>
        </h1>
        <p className="mt-4 text-lg text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
          {siteConfig.description}
        </p>
      </section>

      {/* Featured posts */}
      {featured.length > 0 && (
        <section className="pb-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
            Featured
          </h2>
          <div>
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Recent posts */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
          Recent Posts
        </h2>
        <div>
          {recent.length > 0 ? (
            recent.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
              No posts yet. Start writing!
            </p>
          )}
        </div>
        {posts.length > siteConfig.postsPerPage && (
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] transition-colors hover:underline dark:text-[var(--color-accent-dark)]"
          >
            All posts <ArrowRight size={14} />
          </Link>
        )}
      </section>
    </div>
  );
}
