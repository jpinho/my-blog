# Claude Instructions for My Blog

## Project Overview
This is João Pinho's personal blog built with Next.js 14, featuring MDX content, dark mode, and GitLab/GitHub activity tracking. The blog focuses on technical writing about AI engineering, distributed systems, and product engineering philosophy.

## Core Principles
- **Minimalist Design**: Clean, readable, focus on content
- **Performance First**: Optimize for speed and efficiency
- **Type Safety**: TypeScript everywhere, no `any` types
- **Modern Patterns**: App Router, Server Components, Tailwind CSS

## Project Structure
```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── content/blog/     # MDX blog posts organized by year
├── lib/             # Utilities and configurations
└── styles/          # Global styles and Tailwind
```

## Key Components

### Content Management
- Blog posts are MDX files in `src/content/blog/YYYY/`
- Frontmatter required: title, date, excerpt, author, tags, featured (optional)
- Images go in `public/images/blog/`

### Git Activity Integration
- GitLab data fetched via `glab` CLI
- GitHub data from public API
- Activity data cached in `src/app/api/gitlab/activity.json`

### Styling Guidelines
- Use CSS variables from `globals.css` for theming
- Tailwind classes for layout and spacing
- Custom animations defined in `tailwind.config.ts`
- Dark mode via `next-themes` provider

## Development Workflow

### Adding a Blog Post
1. Create MDX file in `src/content/blog/YYYY/post-slug.mdx`
2. Add frontmatter with required fields
3. Place images in `public/images/blog/`
4. Test locally with `npm run dev`

### Updating Git Activity
1. Run `scripts/update-gitlab-activity.sh` for GitLab data
2. GitHub data updates automatically via public API
3. Check component rendering in About page

### Code Standards
- Run `npm run lint` before committing
- Run `npm run type-check` for TypeScript validation
- Follow existing patterns for component structure
- Use semantic commit messages

## Important Files
- `src/lib/posts.ts` - Blog post processing logic
- `src/lib/config.ts` - Site configuration
- `src/components/GitActivity.tsx` - Git contribution display
- `src/app/about/page.tsx` - About page with full bio

## Deployment
- Hosted on Vercel
- Environment variables needed:
  - `GITLAB_API_TOKEN` (optional, for private GitLab data)
- Auto-deploy on push to main branch

## Testing Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript validation
```

## Common Tasks

### Hide/Show Audio Controls
Audio controls are in `src/components/AudioPlayer.tsx`. Currently returning `null` to hide them. Uncomment the component code to restore.

### Update Profile Photo
Place image in `public/images/about/` and update reference in `src/app/about/page.tsx`

### Modify Site Metadata
Edit `src/lib/config.ts` for site-wide configuration changes

## Component Patterns

### MDX Components
Custom components available in MDX:
- `<YouTubeEmbed />` - Embed YouTube videos
- `<AudioPlayer />` - Audio content (currently hidden)
- Standard markdown with syntax highlighting

### Data Fetching
- Use React Server Components for static data
- Client components for interactive features
- Cache external API responses when possible

## Performance Optimizations
- Dynamic imports for heavy components
- Image optimization with Next.js Image
- Font optimization with next/font
- Minimal client-side JavaScript

## Notes for Claude
- Keep responses concise and technical
- Follow existing code patterns
- Preserve TypeScript types
- Test changes locally before suggesting
- Consider performance impact of changes
- Maintain clean git history