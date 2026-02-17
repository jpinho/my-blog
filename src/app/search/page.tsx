"use client";

import { useState, useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import PostCard from "@/components/PostCard";
import { PostMeta } from "@/lib/posts";

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
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] sm:text-4xl mb-8">
        Search
      </h1>

      <div className="relative mb-8">
        <SearchIcon
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]"
        />
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-[var(--color-border-primary)] bg-[var(--color-bg)] py-2.5 pl-9 pr-4 text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-primary)] dark:border-[var(--color-border-primary-dark)] dark:bg-[var(--color-bg-dark)] dark:text-[var(--color-text-primary-dark)] dark:focus:border-[var(--color-primary-dark)]"
          autoFocus
        />
      </div>

      {query.trim() && (
        <p className="mb-4 text-xs text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
          {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
        </p>
      )}

      {results.length > 0 && (
        <div className="border-t border-[var(--color-border-primary)] dark:border-[var(--color-border-primary-dark)]">
          {results.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
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
