import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
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
      {/* Back button */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors mb-8 dark:text-[var(--color-text-tertiary-dark)] dark:hover:text-[var(--color-text-primary-dark)]"
      >
        <ArrowLeft size={16} />
        Back to posts
      </Link>

      {/* Post header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] sm:text-5xl mb-4 animate-slide-in">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-xl text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] leading-relaxed mb-6">
            {post.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
          <span className="flex items-center gap-2">
            <Calendar size={14} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={14} />
            {post.readingTime}
          </span>
        </div>

        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-bg-secondary)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white dark:bg-[var(--color-bg-secondary-dark)] dark:text-[var(--color-text-tertiary-dark)] dark:hover:bg-[var(--color-primary-dark)]"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="h-px bg-[var(--color-border-primary)] dark:bg-[var(--color-border-primary-dark)] mb-12"></div>

      {/* Audio Player */}
      {post.audioUrl && (
        <AudioPlayer
          src={post.audioUrl}
          title={`Listen to "${post.title}"`}
          duration={post.readingTime}
        />
      )}

      {/* Post content */}
      <div className="prose prose-lg max-w-none dark:prose-invert
        prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-[var(--color-text-primary)] prose-p:leading-relaxed prose-p:mb-6
        prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline
        prose-strong:text-[var(--color-text-primary)] prose-strong:font-semibold
        prose-ul:my-6 prose-li:text-[var(--color-text-primary)]
        prose-ol:my-6
        prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-primary)] prose-blockquote:pl-4 prose-blockquote:italic
        prose-code:bg-[var(--color-bg-secondary)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        prose-pre:bg-[var(--color-surface-elevated)] prose-pre:border prose-pre:border-[var(--color-border-secondary)]
        dark:prose-p:text-[var(--color-text-primary-dark)]
        dark:prose-strong:text-[var(--color-text-primary-dark)]
        dark:prose-li:text-[var(--color-text-primary-dark)]
        dark:prose-a:text-[var(--color-primary-dark)]
        dark:prose-blockquote:border-[var(--color-primary-dark)]
        dark:prose-code:bg-[var(--color-bg-secondary-dark)]
        dark:prose-pre:bg-[var(--color-surface-elevated-dark)] dark:prose-pre:border-[var(--color-border-secondary-dark)]"
      >
        <MDXRemote
          source={post.content}
          options={mdxOptions}
          components={components}
        />
      </div>

      {/* Share section */}
      <div className="mt-16 pt-8 border-t border-[var(--color-border-primary)] dark:border-[var(--color-border-primary-dark)]">
        <p className="text-sm text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
          Share this post:
        </p>
        <div className="mt-4 flex gap-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-primary-dark)]"
          >
            Twitter
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-primary-dark)]"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </article>
  );
}
