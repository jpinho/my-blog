import { getAllPosts, getAllTags } from "@/lib/posts";
import { siteConfig } from "@/lib/config";

export async function GET() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const staticPages = ["", "/blog", "/tags", "/about", "/search"];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (path) => `  <url>
    <loc>${siteConfig.siteUrl}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
${posts
  .map(
    (post) => `  <url>
    <loc>${siteConfig.siteUrl}/blog/${post.slug}</loc>
    <lastmod>${post.modifiedDate || post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join("\n")}
${tags
  .map(
    (tag) => `  <url>
    <loc>${siteConfig.siteUrl}/tags/${tag.name}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
