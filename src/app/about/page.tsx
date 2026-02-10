import { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.author}`,
};

export default function AboutPage() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <h1>About Me</h1>

      <p>
        I&apos;m a Distinguished Engineer with deep experience in TypeScript,
        React, AWS, and distributed systems. Currently exploring the
        intersection of AI/ML, Rust, and systems programming.
      </p>

      <p>
        I write about engineering challenges, system design, career strategy, and
        occasionally life stuff. When I&apos;m not coding, you&apos;ll find me
        training for an Ironman or spending time with my two kids.
      </p>

      <h2>What I Write About</h2>

      <p>
        Deep dives into TypeScript and Node.js, Rust explorations, AI/ML
        engineering, cloud architecture on AWS, distributed systems patterns, and
        the occasional career strategy post.
      </p>

      <h2>Connect</h2>

      <p>
        Find me on{" "}
        <a href={siteConfig.social.github} target="_blank" rel="noopener">
          GitHub
        </a>
        ,{" "}
        <a href={siteConfig.social.twitter} target="_blank" rel="noopener">
          Twitter
        </a>
        , and{" "}
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener">
          LinkedIn
        </a>
        .
      </p>
    </div>
  );
}
