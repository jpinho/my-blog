"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GitCommit, GitBranch, GitPullRequest, Star, Users, Calendar } from "lucide-react";

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  payload: any;
  created_at: string;
}

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitLabEvent {
  action_name: string;
  target_title?: string;
  project_name?: string;
  created_at: string;
}

interface GitLabData {
  user?: {
    username: string;
    name: string;
  };
  events?: GitLabEvent[];
  activityByDate?: Array<{
    date: string;
    events: number;
    commits: number;
    mergeRequests: number;
    issues: number;
  }>;
  recentMergeRequests?: Array<{
    date: string;
    title: string;
    status: string;
  }>;
}

export default function GitActivity() {
  const [githubEvents, setGithubEvents] = useState<GitHubEvent[]>([]);
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [gitlabData, setGitlabData] = useState<GitLabData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubActivity = async () => {
      try {
        // Fetch GitHub events
        const eventsRes = await fetch("https://api.github.com/users/jpinho/events/public");
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          setGithubEvents(events.slice(0, 5));
        }

        // Fetch GitHub stats
        const statsRes = await fetch("https://api.github.com/users/jpinho");
        if (statsRes.ok) {
          const stats = await statsRes.json();
          setGithubStats(stats);
        }
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    const fetchGitLabActivity = async () => {
      try {
        // Fetch from our secure API route
        const response = await fetch('/api/gitlab');
        if (response.ok) {
          const data = await response.json();
          setGitlabData(data);
        }
      } catch (error) {
        console.error("Error fetching GitLab data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubActivity();
    fetchGitLabActivity();
  }, []);

  const formatEventType = (type: string) => {
    switch (type) {
      case "PushEvent":
        return { icon: <GitCommit size={14} />, text: "Pushed to" };
      case "CreateEvent":
        return { icon: <GitBranch size={14} />, text: "Created" };
      case "PullRequestEvent":
        return { icon: <GitPullRequest size={14} />, text: "Pull request" };
      case "WatchEvent":
        return { icon: <Star size={14} />, text: "Starred" };
      default:
        return { icon: <GitCommit size={14} />, text: type.replace("Event", "") };
    }
  };

  const formatGitLabAction = (action: string) => {
    switch (action) {
      case "pushed to":
      case "pushed new":
        return { icon: <GitCommit size={14} />, text: "Pushed" };
      case "opened":
      case "accepted":
      case "merged":
        return { icon: <GitPullRequest size={14} />, text: "Merge request" };
      case "created":
        return { icon: <GitBranch size={14} />, text: "Created" };
      case "commented on":
        return { icon: <GitCommit size={14} />, text: "Commented" };
      default:
        return { icon: <GitCommit size={14} />, text: action };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 168) { // 7 days
      return `${Math.floor(diffInHours / 24)} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-[var(--color-surface-elevated)] rounded-lg mb-4 w-1/3"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-[var(--color-surface-elevated)] rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* GitLab Activity - First */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.845.904c-.435 0-.82.28-.955.692C2.639 5.449 1.246 9.728.07 13.335a1.437 1.437 0 00.522 1.607l11.071 8.045c.2.145.472.145.673 0l11.073-8.045a1.436 1.436 0 00.522-1.607c-1.285-3.942-2.683-8.256-3.817-11.74a1.004 1.004 0 00-.957-.684.987.987 0 00-.949.69l-2.405 7.408H8.203l-2.41-7.408a.987.987 0 00-.942-.69h-.006zm-.006 1.42l2.173 6.678H2.675zm14.326 0l2.168 6.678h-4.341zm-10.593 7.81h6.862c-1.142 3.52-2.288 7.04-3.434 10.559L8.572 10.135zm-5.514.005h4.321l3.086 9.5zm13.567 0h4.325c-2.467 3.17-4.95 6.328-7.411 9.502 1.028-3.167 2.059-6.334 3.086-9.502zM2.1 10.762l6.977 8.947-7.817-5.682a.305.305 0 01-.112-.341zm19.798 0l.952 2.922a.305.305 0 01-.11.341v.002l-7.82 5.68.026-.035z"/>
            </svg>
            GitLab Activity
          </h3>
        </div>

        {/* Recent Merge Requests */}
        {gitlabData.recentMergeRequests && gitlabData.recentMergeRequests.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">Recent Merge Requests</h4>
            {gitlabData.recentMergeRequests.map((mr, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)] hover:bg-[var(--color-hover-light)] dark:hover:bg-[var(--color-hover-dark)] transition-colors"
              >
                <span className="text-[var(--color-primary)] mt-0.5">
                  <GitPullRequest size={14} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium truncate inline-block max-w-full">{mr.title}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      mr.status === 'merged' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                      mr.status === 'opened' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400'
                    }`}>
                      {mr.status}
                    </span>
                    <p className="text-xs text-[var(--color-text-tertiary)]">
                      {formatDate(mr.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GitLab Events */}
        {gitlabData.events && gitlabData.events.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">Recent Activity</h4>
            {gitlabData.events.slice(0, 5).map((event, index) => {
              const { icon, text } = formatGitLabAction(event.action_name);
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)] hover:bg-[var(--color-hover-light)] dark:hover:bg-[var(--color-hover-dark)] transition-colors"
                >
                  <span className="text-[var(--color-primary)] mt-0.5">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{text}</span>{" "}
                      {event.target_title && (
                        <span className="text-[var(--color-text-secondary)]">
                          {event.target_title}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                      {event.project_name && `${event.project_name} • `}
                      {formatDate(event.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Activity Summary */}
        {gitlabData.activityByDate && gitlabData.activityByDate.length > 0 && (
          <div className="p-4 rounded-lg bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)]">
            <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Activity Summary (Last 7 days)</h4>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[var(--color-primary)]">
                  {gitlabData.activityByDate.slice(0, 7).reduce((sum, day) => sum + day.commits, 0)}
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)]">Commits</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-primary)]">
                  {gitlabData.activityByDate.slice(0, 7).reduce((sum, day) => sum + day.mergeRequests, 0)}
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)]">MRs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-primary)]">
                  {gitlabData.activityByDate.slice(0, 7).reduce((sum, day) => sum + day.issues, 0)}
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)]">Issues</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--color-primary)]">
                  {gitlabData.activityByDate.slice(0, 7).reduce((sum, day) => sum + day.events, 0)}
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)]">Total</p>
              </div>
            </div>
          </div>
        )}

        <a
          href="https://gitlab.com/jpinho"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
        >
          View GitLab profile →
        </a>
      </div>

      {/* GitHub Activity - Second */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub Activity
          </h3>
          {githubStats && (
            <div className="flex gap-4 text-sm text-[var(--color-text-tertiary)]">
              <span className="flex items-center gap-1">
                <Users size={14} />
                {githubStats.followers} followers
              </span>
              <span>{githubStats.public_repos} repos</span>
            </div>
          )}
        </div>

        {/* GitHub Contribution Graph */}
        <div className="p-4 rounded-lg bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)] overflow-hidden">
          <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Contribution Graph</h4>
          <img
            src="https://ghchart.rshah.org/4a90e6/jpinho"
            alt="GitHub Contributions"
            className="w-full h-auto"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* GitHub Recent Events */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-[var(--color-text-secondary)] mb-2">Recent Activity</h4>
          {githubEvents.length > 0 ? (
            githubEvents.map((event) => {
              const { icon, text } = formatEventType(event.type);
              return (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-surface-elevated)] dark:bg-[var(--color-surface-elevated-dark)] hover:bg-[var(--color-hover-light)] dark:hover:bg-[var(--color-hover-dark)] transition-colors"
                >
                  <span className="text-[var(--color-primary)] mt-0.5">{icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{text}</span>{" "}
                      <a
                        href={`https://github.com/${event.repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-primary)] hover:underline truncate inline-block max-w-[200px] align-bottom"
                      >
                        {event.repo.name}
                      </a>
                    </p>
                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                      {formatDate(event.created_at)}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-[var(--color-text-tertiary)]">No recent activity</p>
          )}
        </div>

        <a
          href="https://github.com/jpinho"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
        >
          View GitHub profile →
        </a>
      </div>
    </div>
  );
}