import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  modifiedDate?: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  heroImage?: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getFilesRecursively(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getFilesRecursively(fullPath));
    } else if (entry.name.endsWith(".mdx") || entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = getFilesRecursively(CONTENT_DIR);

  const posts = files
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContents);

      const slug =
        data.slug ||
        path.basename(filePath).replace(/\.mdx?$/, "");

      const stats = readingTime(content);

      return {
        slug,
        title: data.title || "Untitled",
        description: data.description || "",
        date: data.date
          ? new Date(data.date).toISOString()
          : new Date().toISOString(),
        modifiedDate: data.modifiedDate
          ? new Date(data.modifiedDate).toISOString()
          : undefined,
        tags: data.tags || [],
        featured: data.featured || false,
        draft: data.draft || false,
        heroImage: data.heroImage || undefined,
        readingTime: stats.text,
        content,
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): { name: string; count: number }[] {
  const tagMap = new Map<string, number>();

  getAllPosts().forEach((post) => {
    post.tags.forEach((tag) => {
      const lower = tag.toLowerCase();
      tagMap.set(lower, (tagMap.get(lower) || 0) + 1);
    });
  });

  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByYear(): Map<number, Post[]> {
  const yearMap = new Map<number, Post[]>();

  getAllPosts().forEach((post) => {
    const year = new Date(post.date).getFullYear();
    if (!yearMap.has(year)) yearMap.set(year, []);
    yearMap.get(year)!.push(post);
  });

  return new Map([...yearMap.entries()].sort((a, b) => b[0] - a[0]));
}
