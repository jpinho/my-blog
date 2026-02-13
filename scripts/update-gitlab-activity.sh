#!/bin/bash

# Update GitLab activity data
echo "Updating GitLab activity data..."

# Get activity summary
ACTIVITY_DATA=$(glab api "events?per_page=100" | jq -r '
[.[] | {
  date: (.created_at | split("T")[0]),
  action: .action_name,
  project: .project_id
}] |
group_by(.date) |
map({
  date: .[0].date,
  events: length,
  commits: ([.[] | select(.action == "pushed to" or .action == "pushed new")] | length),
  mergeRequests: ([.[] | select(.action == "opened" or .action == "accepted" or .action == "merged")] | length),
  issues: ([.[] | select(.action == "closed" or .action == "reopened")] | length)
})' 2>/dev/null)

# Get recent merge requests
MR_DATA=$(glab api "merge_requests?author_username=j.pinho&state=all&per_page=5" | jq -r '
[.[] | {
  date: (.created_at | split("T")[0]),
  title: .title,
  status: .state
}]' 2>/dev/null)

# Create JSON file
cat > src/app/api/gitlab/activity.json << EOF
{
  "lastUpdated": "$(date -I)",
  "activityByDate": $ACTIVITY_DATA,
  "recentMergeRequests": $MR_DATA
}
EOF

echo "GitLab activity data updated successfully!"