import { NextResponse } from 'next/server';

export async function GET() {
  // Only use environment variable, never hardcode tokens
  const token = process.env.GITLAB_API_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: 'GitLab API token not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch user info
    const userResponse = await fetch('https://gitlab.com/api/v4/user', {
      headers: {
        'PRIVATE-TOKEN': token,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch GitLab user data');
    }

    const userData = await userResponse.json();

    // Fetch recent events
    const eventsResponse = await fetch(
      `https://gitlab.com/api/v4/users/${userData.id}/events?per_page=10`,
      {
        headers: {
          'PRIVATE-TOKEN': token,
        },
      }
    );

    const events = eventsResponse.ok ? await eventsResponse.json() : [];

    // Fetch contribution statistics
    const contributionsResponse = await fetch(
      `https://gitlab.com/api/v4/users/${userData.id}/statistics`,
      {
        headers: {
          'PRIVATE-TOKEN': token,
        },
      }
    );

    const contributions = contributionsResponse.ok
      ? await contributionsResponse.json()
      : null;

    return NextResponse.json({
      user: {
        username: userData.username,
        name: userData.name,
        avatar_url: userData.avatar_url,
        public_email: userData.public_email,
      },
      events: events.map((event: any) => ({
        action_name: event.action_name,
        target_title: event.target_title,
        project_name: event.project?.name,
        created_at: event.created_at,
      })),
      contributions,
    });
  } catch (error) {
    console.error('Error fetching GitLab data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitLab data' },
      { status: 500 }
    );
  }
}