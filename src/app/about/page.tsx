import { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import GitActivity from "@/components/GitActivity";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.author}`,
};

export default function AboutPage() {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none animate-fade-in">
      <h1 className="animate-slide-in">About</h1>

      {/* Hero Image */}
      <div className="not-prose mb-8">
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="/images/about/switzerland-2025.jpg"
            alt="At a Swiss train station"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="text-center mt-4 space-y-1">
          <p className="text-base font-medium text-[var(--color-text-primary)]">
            Switzerland 2025
          </p>
          <p className="text-sm text-[var(--color-text-tertiary)] italic">
            Family Trip Zurich to Sion and Back + XTerra in La Brevine!
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-transparent bg-clip-text animate-gradient">
        <p className="text-xl font-semibold">
          Distinguished Engineer at epilot • Core Team • AI Advocate
        </p>
      </div>

      <p className="leading-relaxed">
        I&apos;m a Distinguished Engineer at <strong>epilot</strong> (part of the Core team), where I&apos;ve spent
        5 years building technical foundations across platform architecture, pricing systems, and AI for our XRM in
        the energy and utilities sector.
      </p>

      <p>
        I&apos;ve led teams that built core pricing infrastructure used across our platform, worked on foundational
        data modeling and search systems, and now actively drive AI initiatives as a key advocate and contributor.
        The work spans from hands-on implementation to strategic direction—figuring out what&apos;s worth building
        and what actually delivers value.
      </p>

      <p>
        The challenge with AI in traditional industries is that sophisticated tooling doesn&apos;t always match how
        users actually work. My focus is building solutions that fit the reality of energy &amp; utility companies,
        not just what&apos;s technically impressive. That means being disciplined about adoption, cost, and ROI.
      </p>

      <h2>Git Activity</h2>

      <div className="not-prose mb-8">
        <GitActivity />
      </div>

      <h2>Technical Journey</h2>

      <p>
        Before epilot, I spent over a decade in distributed systems, modern web development, and cloud infrastructure.
        I&apos;m hands-on with TypeScript, React, AWS, and increasingly Python for AI work. The through-line in
        everything I&apos;ve done: solve complex problems, build things that scale, and stay grounded in what
        creates actual value.
      </p>

      <h2>Engineering Philosophy</h2>

      <p>
        I believe in <strong>pragmatic engineering</strong>—the intersection of technical excellence and business
        reality. The best architecture decisions aren&apos;t the most elegant on paper; they&apos;re the ones that
        ship value while maintaining flexibility for the unknown future.
      </p>

      <p>
        My approach to technical leadership is about multiplying impact: enabling teams to move faster, make better
        decisions, and build systems that last. That means writing less code and thinking more about patterns,
        abstractions, and the organizational dynamics that determine whether great ideas actually succeed.
      </p>

      <h2>Current Focus Areas</h2>

      <ul>
        <li><strong>💬 Omnichannel Communication Foundation:</strong> Building epilot&apos;s unified messaging infrastructure, integrating common platforms to enable agentic automation of communication flows</li>
        <li><strong>📄 Document Intelligence:</strong> Driving intelligent document processing capabilities within the platform to extract insights and automate workflows</li>
        <li><strong>🔒 Data Compliance Foundation:</strong> Improving data deletion and anonymization capabilities to help customers comply with GDPR and data regulation standards</li>
        <li><strong>🧠 Entity Intelligence:</strong> Developing activity tracking and AI-powered summarization for entity data to provide actionable insights</li>
        <li><strong>🏗️ Platform Architecture:</strong> Continuing to evolve core platform capabilities that scale technically and organizationally</li>
        <li><strong>⚡ Developer Experience:</strong> Improving internal tooling and workflows to accelerate team productivity and reduce cognitive load</li>
        <li><strong>🎯 API Design Excellence:</strong> Crafting intuitive, consistent APIs that developers love to use, inspired by industry leaders</li>
        <li><strong>🚀 Product Engineering Culture:</strong> Building teams that think beyond code to create real customer value</li>
      </ul>

      <h2>Products That Inspire Me</h2>

      <p>
        I draw inspiration from products that excel not just technically, but in creating exceptional user experiences:
      </p>

      <ul>
        <li><strong>Stripe:</strong> The best payments platform ever built. Their pricing APIs are masterfully designed, and the entire product experience sets the gold standard for developer tools</li>
        <li><strong>Anthropic:</strong> Love how they&apos;re building not just AI, but their security-first approach towards building safer models shows real responsibility in innovation</li>
        <li><strong>Front:</strong> The best omnichannel communication app out there. It&apos;s not just feature-complete—it&apos;s 100% well-built with incredible attention to detail</li>
        <li><strong>Linear:</strong> Their attention to detail and smooth UX is from another planet. Every interaction feels intentional and delightful</li>
        <li><strong>ClickHouse:</strong> The leading solution for dealing with data in 2025. The product isn&apos;t just good—it feels good to use, which is rare for data infrastructure</li>
        <li><strong>PostHog:</strong> An incredibly comprehensive platform that truly gets it. From feature flags to product analytics to LLM observability, it&apos;s well-rounded across the entire 360° offering</li>
      </ul>

      <h2>What I Write About</h2>

      <p>
        My writing reflects what I&apos;m learning and building. Recent themes include:
      </p>

      <ul>
        <li>Cognitive biases in engineering decisions—why smart people make predictable mistakes</li>
        <li>The reality of AI adoption in enterprise—beyond the hype cycle</li>
        <li>Technical debt as a strategic tool, not a moral failing</li>
        <li>Platform engineering in the real world—where perfection is the enemy of progress</li>
        <li>The evolving role of engineers as AI changes the game</li>
      </ul>

      <h2>Beyond the Terminal</h2>

      <p>
        Outside of work, I&apos;m a triathlete and Ironman 70.3 finisher. The same discipline applies to
        engineering: break problems down, show up consistently, focus on what matters. The endurance sports
        mindset translates directly to technical leadership—it&apos;s about sustainable pace, not sprints.
      </p>

      <p>
        I&apos;m also a father, which provides daily lessons in systems thinking, debugging under pressure,
        and accepting that some problems don&apos;t have clean solutions—just trade-offs you can live with.
      </p>

      <h2>Track Record at epilot</h2>

      <p>
        Over 5 years at epilot, I&apos;ve progressed from Senior Engineer to Distinguished Engineer, consistently
        delivering high-impact technical solutions and strategic leadership:
      </p>

      <div className="bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)] rounded-xl p-6 my-6 border border-[var(--color-border-secondary)] dark:border-[var(--color-border-secondary-dark)]">
        <ul className="space-y-4">
          <li>
            <strong className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">🏗️ Core Platform Architecture</strong>
            <span className="block text-sm mt-1">Designed and built epilot&apos;s foundational entity system and data modeling layer—the technical backbone that powers every product feature across our entire platform, enabling rapid feature development and seamless integrations</span>
          </li>
          <li>
            <strong className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">💰 Pricing & Billing Engine</strong>
            <span className="block text-sm mt-1">Single-handedly architected the pricing infrastructure that processes €50M+ in annual transactions, handling Germany&apos;s complex energy tariff structures, time-of-use rates, and regulatory requirements for 100+ B2B customers</span>
          </li>
          <li>
            <strong className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">🔍 Search Infrastructure</strong>
            <span className="block text-sm mt-1">Contributed to building the multi-tenant search system using Elasticsearch, processing 5M+ queries monthly with sub-200ms p99 latency, enabling real-time analytics across 500+ GB of customer data</span>
          </li>
          <li>
            <strong className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">📄 Document Generation Foundation</strong>
            <span className="block text-sm mt-1">Rebuilt epilot&apos;s document generation infrastructure from the ground up and led major improvements to the Variables Engine powering our flexible template system—enabling customers to create complex, dynamic documents at scale</span>
          </li>
          <li>
            <strong className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">📧 Platform Communications</strong>
            <span className="block text-sm mt-1">Scaled email system notifications to provide better and more accurate information to customers, ensuring they don&#39;t have to leave their inbox to know what a notification is about. Currently driving data deletion/anonymization compliance and Outlook integration for our messaging hub—building towards an omnichannel communication foundation</span>
          </li>
          <li>
            <strong className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">🤖 AI Advocate & Explorer</strong>
            <span className="block text-sm mt-1">Promoting AI adoption at epilot—helped shape our summarization feature, explored and evangelized an agentic API developed by a colleague, and advocate for AI integration opportunities across teams</span>
          </li>
          <li>
            <strong className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">⚡ Serverless Expert</strong>
            <span className="block text-sm mt-1">Mastered cloud-native development with CloudFormation, SAM tooling (deploy/sync), and AWS services (SQS, SNS, SES, S3)—champion API-first architecture using openapi-backend, contributing to epilot&apos;s serverless success handling 100M+ monthly API calls</span>
          </li>
          <li>
            <strong className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">🎯 Strategic Engineering Leadership</strong>
            <span className="block text-sm mt-1">Built epilot&apos;s continuous deployment pipeline enabling safe production releases, worked across 3 teams, authored the Principal Engineer RFC defining the role, and implemented Linear-style quality demos that improved product visibility and team alignment</span>
          </li>
          <li>
            <strong className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">👥 Engineering Excellence</strong>
            <span className="block text-sm mt-1">Mentored 8 engineers to promotion, established code review standards reducing bugs by 35%, introduced architectural decision records (ADRs) now used across all teams</span>
          </li>
          <li>
            <strong className="text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">🌍 Technical Thought Leadership</strong>
            <span className="block text-sm mt-1">Share epilot&apos;s engineering journey through internal brown bag talks, podcast appearances, and technical writing on LinkedIn and dev.to—building our engineering brand and attracting top talent</span>
          </li>
        </ul>
      </div>

      <p>
        This progression from individual contributor to company leader reflects not just technical growth, but
        the evolution from solving problems to defining which problems are worth solving—the essence of
        Distinguished Engineering.
      </p>

      <h2>Why This Matters</h2>

      <p>
        Above all, I want to build products that help real humans. Technology and software are just the tools
        I&apos;m most efficient at to achieve that goal. My philosophy is simple: do good, deliver one thing
        a day, be reliable, and build software to help humans.
      </p>

      <p>
        Every line of code, every architecture decision, every system I build—it all comes back to this:
        Is this making someone&apos;s life better? Is this solving a real problem for a real person? The
        technical excellence matters only insofar as it enables us to help people more effectively.
      </p>

      <p>
        At epilot, this means helping energy companies serve their customers better. In my writing, it means
        sharing knowledge that helps other engineers grow. In everything I do, it&apos;s about using technology
        as a force for good—one reliable delivery at a time.
      </p>

      <h2>Connect</h2>

      <p>
        Let&apos;s connect and discuss how we can build the future of software engineering together:
      </p>

      <div className="flex gap-4 flex-wrap">
        <a href={siteConfig.social.github} target="_blank" rel="noopener" className="no-underline">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-elevated)] hover:bg-[var(--color-hover-light)] border border-[var(--color-border-secondary)] rounded-lg transition-all">
            GitHub
          </span>
        </a>
        <a href={siteConfig.social.twitter} target="_blank" rel="noopener" className="no-underline">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-elevated)] hover:bg-[var(--color-hover-light)] border border-[var(--color-border-secondary)] rounded-lg transition-all">
            Twitter
          </span>
        </a>
        <a href={siteConfig.social.linkedin} target="_blank" rel="noopener" className="no-underline">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-elevated)] hover:bg-[var(--color-hover-light)] border border-[var(--color-border-secondary)] rounded-lg transition-all">
            LinkedIn
          </span>
        </a>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20">
        <h3 className="text-lg font-semibold mb-3 mt-0">🏃‍♂️ Track My Endurance Journey</h3>
        <p className="mb-4">
          Catch me if you can! Follow my Ironman 70.3 training and endurance sports journey.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a
            href="https://strava.com/athletes/101563636"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FC4C02] hover:bg-[#E34402] text-white font-semibold rounded-lg transition-all no-underline"
          >
            Follow on Strava
          </a>
          <a
            href="https://connect.garmin.com/app/profile/4781b577-b536-40a0-8973-2940734e982e"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#007ACC] hover:bg-[#005A9E] text-white font-semibold rounded-lg transition-all no-underline"
          >
            View on Garmin Connect
          </a>
        </div>
      </div>
    </div>
  );
}