import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
  // Strip content for the search index, only send metadata
  const meta: PostMeta[] = posts.map(({ content, ...rest }) => rest);
  return NextResponse.json(meta);
}
