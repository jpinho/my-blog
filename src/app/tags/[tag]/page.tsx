import { Metadata } from "next";
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
    title: `#${tag}`,
    description: `Posts tagged with "${tag}".`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        Posts tagged{" "}
        <span className="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]">
          #{tag}
        </span>
      </h1>

      {posts.length === 0 ? (
        <p className="text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
          No posts with this tag.
        </p>
      ) : (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      )}
    </div>
  );
}
