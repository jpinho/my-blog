import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: siteConfig.title,
    description: siteConfig.description,
    id: siteConfig.siteUrl,
    link: siteConfig.siteUrl,
    language: "en",
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.author}`,
    author: {
      name: siteConfig.author,
      link: siteConfig.siteUrl,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteConfig.siteUrl}/blog/${post.slug}`,
      link: `${siteConfig.siteUrl}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      published: new Date(post.date),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
