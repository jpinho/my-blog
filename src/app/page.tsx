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
      <section className="pb-16 animate-fade-in">
        <div className="relative">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] sm:text-5xl lg:text-6xl animate-slide-in">
            Hey, I&apos;m{" "}
            <span className="relative inline-block bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent animate-gradient">
              {siteConfig.author}
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-lg blur opacity-20 animate-glow"></div>
            </span>
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
            {siteConfig.description}
          </p>
          <div className="mt-8 p-6 bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)] rounded-2xl border border-[var(--color-border-secondary)] dark:border-[var(--color-border-secondary-dark)] hover:border-[var(--color-border-accent)] hover:border-[var(--color-border-accent-dark)] transition-all duration-300 hover:shadow-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
            <p className="text-lg text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] font-medium mb-2">
              What you&apos;ll find here:
            </p>
            <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] leading-relaxed">
              Deep technical insights on AI engineering, distributed systems, and product engineering philosophy.
              From practical guides on DynamoDB optimization to strategic thinking about tech debt, cognitive biases in engineering,
              and the evolution of software craftsmanship in the age of AI. Written by a Principal Engineer who believes
              in solving problems that matter, not just writing code.
            </p>
          </div>
        </div>
      </section>

      {/* Featured posts */}
      {featured.length > 0 && (
        <section className="pb-16 animate-fade-in" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
              Featured Posts
            </h2>
            <div className="flex-1 h-px bg-[var(--color-border-primary)] dark:bg-[var(--color-border-primary-dark)]"></div>
          </div>
          <div className="space-y-6">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Recent posts */}
      <section className="animate-fade-in" style={{animationDelay: '0.4s'}}>
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
            Recent Posts
          </h2>
          <div className="flex-1 h-px bg-[var(--color-border-primary)] dark:bg-[var(--color-border-primary-dark)]"></div>
        </div>
        <div className="space-y-6">
          {recent.length > 0 ? (
            recent.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
              No posts yet. Start writing!
            </p>
          )}
        </div>
        {posts.length > siteConfig.postsPerPage && (
          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-surface-elevated)] hover:bg-[var(--color-hover-light)] border border-[var(--color-border-secondary)] text-[var(--color-text-primary)] font-medium rounded-xl transition-all duration-300 hover:shadow-[var(--shadow-soft)] dark:bg-[var(--color-surface-elevated-dark)] dark:hover:bg-[var(--color-hover-dark)] dark:border-[var(--color-border-secondary-dark)] dark:text-[var(--color-text-primary-dark)]"
            >
              View all posts
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
