import { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import GitActivity from "@/components/GitActivity";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.author}`,
};

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] sm:text-4xl mb-10">
        About
      </h1>

      {/* Hero Image */}
      <div className="mb-10">
        <div className="rounded-lg overflow-hidden border border-[var(--color-border-primary)] dark:border-[var(--color-border-primary-dark)]">
          <img
            src="/images/about/switzerland-2025.jpg"
            alt="At a Swiss train station"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="mt-3 space-y-0.5">
          <p className="text-sm font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
            Switzerland 2025
          </p>
          <p className="text-xs text-[var(--color-text-tertiary)] dark:text-[var(--color-text-tertiary-dark)]">
            Family Trip Zurich to Sion and Back + XTerra in La Brevine!
          </p>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none
        prose-p:text-[var(--color-text-secondary)] prose-p:leading-relaxed
        prose-strong:text-[var(--color-text-primary)]
        prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline
        prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-10 prose-h2:mb-4
        prose-li:text-[var(--color-text-secondary)]
        dark:prose-p:text-[var(--color-text-secondary-dark)]
        dark:prose-strong:text-[var(--color-text-primary-dark)]
        dark:prose-a:text-[var(--color-primary-dark)]
        dark:prose-li:text-[var(--color-text-secondary-dark)]">

        <p className="text-base font-medium text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">
          Distinguished Engineer at epilot &middot; Core Team &middot; AI Advocate
        </p>

        <p>
          I&apos;m a Distinguished Engineer at <strong>epilot</strong> (part of the Core team), where I&apos;ve spent
          5 years building technical foundations across platform architecture, pricing systems, and AI for our XRM in
          the energy and utilities sector.
        </p>

        <p>
          I&apos;ve led teams that built core pricing infrastructure used across our platform, worked on foundational
          data modeling and search systems, and now actively drive AI initiatives as a key advocate and contributor.
          The work spans from hands-on implementation to strategic direction&mdash;figuring out what&apos;s worth building
          and what actually delivers value.
        </p>

        <p>
          The challenge with AI in traditional industries is that sophisticated tooling doesn&apos;t always match how
          users actually work. My focus is building solutions that fit the reality of energy &amp; utility companies,
          not just what&apos;s technically impressive.
        </p>

        <h2>Git Activity</h2>

        <div className="not-prose mb-8">
          <GitActivity />
        </div>

        <h2>Technical Journey</h2>

        <p>
          Before epilot, I spent over a decade in distributed systems, modern web development, and cloud infrastructure.
          I&apos;m hands-on with TypeScript, React, AWS, and increasingly Python for AI work.
        </p>

        <h2>Engineering Philosophy</h2>

        <p>
          I believe in <strong>pragmatic engineering</strong>&mdash;the intersection of technical excellence and business
          reality. The best architecture decisions aren&apos;t the most elegant on paper; they&apos;re the ones that
          ship value while maintaining flexibility for the unknown future.
        </p>

        <p>
          My approach to technical leadership is about multiplying impact: enabling teams to move faster, make better
          decisions, and build systems that last.
        </p>

        <h2>What I Write About</h2>

        <ul>
          <li>Cognitive biases in engineering decisions</li>
          <li>The reality of AI adoption in enterprise</li>
          <li>Technical debt as a strategic tool</li>
          <li>Platform engineering in the real world</li>
          <li>The evolving role of engineers as AI changes the game</li>
        </ul>

        <h2>Beyond the Terminal</h2>

        <p>
          Outside of work, I&apos;m a triathlete and Ironman 70.3 finisher. I&apos;m also a father, which provides
          daily lessons in systems thinking and debugging under pressure.
        </p>

        <h2>Connect</h2>

        <div className="not-prose flex flex-wrap gap-4 text-sm">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            X
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://strava.com/athletes/101563636"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] dark:text-[var(--color-text-secondary-dark)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors"
          >
            Strava
          </a>
        </div>
      </div>
    </div>
  );
}
