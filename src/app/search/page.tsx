"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import PostCard from "@/components/PostCard";
import { PostMeta } from "@/lib/posts";

// Client-side search - posts passed via a wrapper
function SearchContent({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.description.toLowerCase().includes(lower) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lower))
    );
  }, [query, posts]);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight">Search</h1>

      <div className="relative mb-8">
        <SearchIcon
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]"
        />
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] py-3 pl-10 pr-4 text-[var(--color-text)] outline-none transition-colors focus:border-[var(--color-accent)] dark:border-[var(--color-border-dark)] dark:bg-[var(--color-bg-dark)] dark:text-[var(--color-text-dark)] dark:focus:border-[var(--color-accent-dark)]"
          autoFocus
        />
      </div>

      {query.trim() && (
        <p className="mb-4 text-sm text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">
          {results.length} result{results.length !== 1 ? "s" : ""} for &quot;
          {query}&quot;
        </p>
      )}

      {results.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

export default function SearchPage() {
  // In a real setup, you'd fetch posts server-side and pass them
  // For now we'll use a dynamic import approach
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    // Fetch posts from an API route
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }

  return <SearchContent posts={posts} />;
}
