import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDateCompact } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import { YouTube } from "@/components/YouTubeEmbed";
import AudioPlayer from "@/components/AudioPlayer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modifiedDate,
      authors: [siteConfig.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `${siteConfig.siteUrl}/blog/${post.slug}`;

  const components = {
    YouTubeEmbed,
    YouTube,
  };

  return (
    <article className="animate-fade-in">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors mb-10 dark:text-[var(--color-text-tertiary-dark)] dark:hover:text-[var(--color-text-primary-dark)]"
      >
        <ArrowLeft size={14} />
        Blog
      </Link>

      {/* Article header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] sm:text-4xl leading-tight mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
          <time>{formatDateCompact(post.date)}</time>
          <span>{siteConfig.author}</span>
          <span>{post.readingTime}</span>
        </div>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-primary)] dark:text-[var(--color-text-tertiary-dark)] dark:hover:text-[var(--color-primary-dark)] transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Share links */}
        <div className="mt-4 flex items-center gap-4 text-sm">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-tertiary-dark)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            X
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-tertiary-dark)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </header>

      <div className="h-px bg-[var(--color-border-primary)] dark:bg-[var(--color-border-primary-dark)] mb-10"></div>

      {/* Audio Player */}
      {post.audioUrl && (
        <AudioPlayer
          src={post.audioUrl}
          title={`Listen to "${post.title}"`}
          duration={post.readingTime}
        />
      )}

      {/* Article content */}
      <div className="prose prose-lg max-w-none dark:prose-invert
        prose-h2:text-xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-[var(--color-text-secondary)] prose-p:leading-relaxed prose-p:mb-5
        prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-[var(--color-text-primary)] prose-strong:font-semibold
        prose-ul:my-5 prose-li:text-[var(--color-text-secondary)]
        prose-ol:my-5
        prose-blockquote:border-l-2 prose-blockquote:border-[var(--color-border-primary)] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-[var(--color-text-tertiary)]
        prose-code:bg-[var(--color-surface-elevated)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-[var(--color-surface-elevated)] prose-pre:border prose-pre:border-[var(--color-border-primary)]
        prose-img:rounded-lg prose-img:border prose-img:border-[var(--color-border-primary)]
        dark:prose-p:text-[var(--color-text-secondary-dark)]
        dark:prose-strong:text-[var(--color-text-primary-dark)]
        dark:prose-li:text-[var(--color-text-secondary-dark)]
        dark:prose-a:text-[var(--color-primary-dark)]
        dark:prose-blockquote:border-[var(--color-border-primary-dark)] dark:prose-blockquote:text-[var(--color-text-tertiary-dark)]
        dark:prose-code:bg-[var(--color-surface-elevated-dark)]
        dark:prose-pre:bg-[var(--color-surface-elevated-dark)] dark:prose-pre:border-[var(--color-border-primary-dark)]
        dark:prose-img:border-[var(--color-border-primary-dark)]"
      >
        <MDXRemote
          source={post.content}
          options={mdxOptions}
          components={components}
        />
      </div>

      {/* Author section */}
      <div className="mt-16 pt-8 border-t border-[var(--color-border-primary)] dark:border-[var(--color-border-primary-dark)]">
        <p className="text-sm text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
          Written by{" "}
          <Link
            href="/about"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            {siteConfig.author}
          </Link>
        </p>
      </div>
    </article>
  );
}
