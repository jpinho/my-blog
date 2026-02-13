import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from '@/components/PostCard';
import { PostMeta } from '@/lib/posts';

describe('PostCard Component', () => {
  const mockPost: PostMeta = {
    slug: 'test-post',
    title: 'Test Post Title',
    description: 'This is a test post description',
    date: new Date('2024-02-12'),
    tags: ['test', 'react'],
    readingTime: '5 min read',
    featured: false,
  };

  it('renders the post card with title and description', () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('This is a test post description')).toBeInTheDocument();
  });

  it('renders a clickable link to the blog post', () => {
    render(<PostCard post={mockPost} />);

    const postLink = screen.getByRole('link', { name: /Test Post Title/i });
    expect(postLink).toBeInTheDocument();
    expect(postLink).toHaveAttribute('href', '/blog/test-post');
  });

  it('ensures the entire title area is clickable', () => {
    render(<PostCard post={mockPost} />);

    // Check that the Link wraps both title and description
    const links = screen.getAllByRole('link');
    const mainPostLink = links.find(link => link.getAttribute('href') === '/blog/test-post');

    expect(mainPostLink).toBeInTheDocument();
    expect(mainPostLink).toContainElement(screen.getByText('Test Post Title'));

    if (mockPost.description) {
      expect(mainPostLink).toContainElement(screen.getByText('This is a test post description'));
    }
  });

  it('renders tag links correctly', () => {
    render(<PostCard post={mockPost} />);

    const testTagLink = screen.getByRole('link', { name: /test/i });
    const reactTagLink = screen.getByRole('link', { name: /react/i });

    expect(testTagLink).toHaveAttribute('href', '/tags/test');
    expect(reactTagLink).toHaveAttribute('href', '/tags/react');
  });

  it('displays reading time correctly', () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('handles posts without descriptions', () => {
    const postWithoutDescription = { ...mockPost, description: undefined };
    render(<PostCard post={postWithoutDescription} />);

    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.queryByText('This is a test post description')).not.toBeInTheDocument();
  });

  it('handles posts without tags', () => {
    const postWithoutTags = { ...mockPost, tags: [] };
    render(<PostCard post={postWithoutTags} />);

    // Should not render any tag links
    const tagLinks = screen.queryAllByRole('link').filter(link =>
      link.getAttribute('href')?.startsWith('/tags/')
    );
    expect(tagLinks).toHaveLength(0);
  });
});