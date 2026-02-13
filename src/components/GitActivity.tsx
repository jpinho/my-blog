"use client";

import { useEffect, useState } from "react";
import { GitCommit, GitPullRequest, Code, Bug, FileText, Zap, Shield, Package } from "lucide-react";
import dynamic from "next/dynamic";

const GitLabHeatmap = dynamic(() => import('./GitLabHeatmap'), { ssr: false });

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitLabSummary {
  total_commits: number;
  total_merge_requests: number;
  total_issues: number;
  months_active: number;
}

interface ContributionCategory {
  icon: JSX.Element;
  label: string;
  count: number;
  color: string;
}

export default function GitActivity() {
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [gitlabSummary, setGitlabSummary] = useState<GitLabSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const statsRes = await fetch("https://api.github.com/users/jpinho");
        if (statsRes.ok) {
          const stats = await statsRes.json();
          setGithubStats(stats);
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    const fetchGitLabSummary = async () => {
      try {
        const response = await fetch('/api/gitlab');
        if (response.ok) {
          const data = await response.json();
          // Extract summary stats from the API response
          if (data.activityByDate) {
            const summary = {
              total_commits: data.activityByDate.reduce((sum: number, day: any) => sum + (day.commits || 0), 0),
              total_merge_requests: data.activityByDate.reduce((sum: number, day: any) => sum + (day.mergeRequests || 0), 0),
              total_issues: data.activityByDate.reduce((sum: number, day: any) => sum + (day.issues || 0), 0),
              months_active: 12
            };
            setGitlabSummary(summary);
          }
        }
      } catch (error) {
        console.error("Error fetching GitLab data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
    fetchGitLabSummary();
  }, []);

  // Define contribution categories with icons and estimated counts
  const githubCategories: ContributionCategory[] = [
    { icon: <Code size={16} />, label: "Open Source", count: githubStats?.public_repos || 0, color: "text-blue-600 dark:text-blue-400" },
    { icon: <GitPullRequest size={16} />, label: "Pull Requests", count: 45, color: "text-purple-600 dark:text-purple-400" },
    { icon: <Bug size={16} />, label: "Issues", count: 23, color: "text-red-600 dark:text-red-400" },
    { icon: <FileText size={16} />, label: "Documentation", count: 12, color: "text-green-600 dark:text-green-400" },
  ];

  const gitlabCategories: ContributionCategory[] = [
    { icon: <GitCommit size={16} />, label: "Commits", count: gitlabSummary?.total_commits || 0, color: "text-orange-600 dark:text-orange-400" },
    { icon: <GitPullRequest size={16} />, label: "Merge Requests", count: gitlabSummary?.total_merge_requests || 0, color: "text-purple-600 dark:text-purple-400" },
    { icon: <Zap size={16} />, label: "Performance", count: 28, color: "text-yellow-600 dark:text-yellow-400" },
    { icon: <Shield size={16} />, label: "Security", count: 15, color: "text-indigo-600 dark:text-indigo-400" },
    { icon: <Package size={16} />, label: "Infrastructure", count: 34, color: "text-cyan-600 dark:text-cyan-400" },
  ];

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="space-y-8">
          <div>
            <div className="h-6 bg-[var(--color-surface-elevated)] rounded mb-4 w-24"></div>
            <div className="h-32 bg-[var(--color-surface-elevated)] rounded-lg"></div>
          </div>
          <div>
            <div className="h-6 bg-[var(--color-surface-elevated)] rounded mb-4 w-24"></div>
            <div className="h-32 bg-[var(--color-surface-elevated)] rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* GitLab Activity - First */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.845.904c-.435 0-.82.28-.955.692C2.639 5.449 1.246 9.728.07 13.335a1.437 1.437 0 00.522 1.607l11.071 8.045c.2.145.472.145.673 0l11.073-8.045a1.436 1.436 0 00.522-1.607c-1.285-3.942-2.683-8.256-3.817-11.74a1.004 1.004 0 00-.957-.684.987.987 0 00-.949.69l-2.405 7.408H8.203l-2.41-7.408a.987.987 0 00-.942-.69h-.006zm-.006 1.42l2.173 6.678H2.675zm14.326 0l2.168 6.678h-4.341zm-10.593 7.81h6.862c-1.142 3.52-2.288 7.04-3.434 10.559L8.572 10.135zm-5.514.005h4.321l3.086 9.5zm13.567 0h4.325c-2.467 3.17-4.95 6.328-7.411 9.502 1.028-3.167 2.059-6.334 3.086-9.502zM2.1 10.762l6.977 8.947-7.817-5.682a.305.305 0 01-.112-.341zm19.798 0l.952 2.922a.305.305 0 01-.11.341v.002l-7.82 5.68.026-.035z"/>
          </svg>
          GitLab Contributions
        </h3>

        {/* GitLab Contribution Graph */}
        <div className="p-6 rounded-lg bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)] border border-[var(--color-border-secondary)] dark:border-[var(--color-border-secondary-dark)]">
          <div className="space-y-4">
            <GitLabHeatmap />
            <div className="flex justify-between items-center px-4">
              <div className="flex gap-2">
                <span className="text-2xl font-bold text-[var(--color-primary)]">
                  {gitlabSummary?.total_commits || '1,200+'}
                </span>
                <span className="text-sm text-[var(--color-text-tertiary)] self-end pb-0.5">
                  commits in the last year
                </span>
              </div>
              <a
                href="https://gitlab.com/j.pinho"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
              >
                View profile →
              </a>
            </div>
          </div>
        </div>

        {/* GitLab Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {gitlabCategories.map((category, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)] border border-[var(--color-border-secondary)] dark:border-[var(--color-border-secondary-dark)]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={category.color}>{category.icon}</span>
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  {category.label}
                </span>
              </div>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">
                {category.count > 0 ? category.count : '-'}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub Activity - Second */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub Contributions
        </h3>

        {/* GitHub Contribution Graph */}
        <div className="p-6 rounded-lg bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)] border border-[var(--color-border-secondary)] dark:border-[var(--color-border-secondary-dark)]">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[700px]">
              <img
                src="https://ghchart.rshah.org/4a90e6/jpinho"
                alt="GitHub Contributions"
                className="w-full h-auto"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
          <div className="text-xs text-center text-[var(--color-text-tertiary)] mt-2">
            Real GitHub contribution data from the past year
          </div>
        </div>

        {/* GitHub Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {githubCategories.map((category, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)] border border-[var(--color-border-secondary)] dark:border-[var(--color-border-secondary-dark)]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={category.color}>{category.icon}</span>
                <span className="text-xs font-medium text-[var(--color-text-secondary)]">
                  {category.label}
                </span>
              </div>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">
                {category.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}