import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostCard from "@/components/PostCard";
import { getAllTags, getPostsByTag } from "@/lib/posts";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tag.name }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: tag,
    description: `Posts tagged with "${tag}".`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="animate-fade-in">
      <Link
        href="/tags"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors mb-10 dark:text-[var(--color-text-tertiary-dark)] dark:hover:text-[var(--color-text-primary-dark)]"
      >
        <ArrowLeft size={14} />
        Topics
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] sm:text-4xl">
          {tag}
        </h1>
        <p className="mt-3 text-sm text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="py-8 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
          No posts with this topic.
        </p>
      ) : (
        <div className="border-t border-[var(--color-border-primary)] dark:border-[var(--color-border-primary-dark)]">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
