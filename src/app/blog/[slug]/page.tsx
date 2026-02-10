import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import StoryView, { StorySlide } from "@/components/StoryView";

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

const SLIDE_GRADIENTS = [
  "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  "linear-gradient(135deg, #232526, #414345)",
  "linear-gradient(135deg, #0d1b2a, #1b2838, #2a4a5e)",
  "linear-gradient(135deg, #1c1c3c, #2d2d5e, #3a3a80)",
  "linear-gradient(135deg, #141e30, #243b55)",
  "linear-gradient(135deg, #0b0b0f, #1a1a2e, #2d2d4e)",
];

function splitContentIntoSections(content: string): string[] {
  const lines = content.split("\n");
  const sections: string[] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current.length > 0) {
        sections.push(current.join("\n").trim());
      }
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) {
    sections.push(current.join("\n").trim());
  }

  return sections.filter((s) => s.length > 0);
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

  const sections = splitContentIntoSections(post.content);

  return (
    <StoryView
      title={post.title}
      date={formatDate(post.date)}
      totalSlides={sections.length}
    >
      {sections.map((section, i) => (
        <StorySlide
          key={i}
          index={i}
          gradient={SLIDE_GRADIENTS[i % SLIDE_GRADIENTS.length]}
        >
          <MDXRemote source={section} options={mdxOptions} />
        </StorySlide>
      ))}
    </StoryView>
  );
}
