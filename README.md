# RWSDK Content Collections

A demonstration of integrating [Content Collections](https://www.content-collections.dev/) with [RedwoodSDK](https://rwsdk.com) to create a modern blog with protected content, user authentication, and HTML compilation for Cloudflare Workers compatibility.

**Live Demo:** [https://rwsdk-content-collections.mjmeyer.workers.dev/](https://rwsdk-content-collections.mjmeyer.workers.dev/)

## Features

- 📝 **Markdown Blog Posts** - Write posts in Markdown with frontmatter metadata
- 🔒 **Protected Content** - Control access to posts with user authentication
- 🔐 **Passkey Authentication** - Secure, passwordless login using WebAuthn
- 🎨 **Basic Styling** - Clean, responsive design
- 🚀 **Cloudflare Workers** - Optimized for edge deployment

## Quick Start

1. **Clone and Install**
   ```bash
   git clone https://github.com/mj-meyer/rwsdk-content-collections.git
   cd rwsdk-content-collections
   pnpm install
   ```

2. **Initialize and Run**
   ```bash
   pnpm dev:init  # Sets up environment and database
   pnpm dev       # Start development server
   ```

## How It Works

### Content Collections Integration

This project uses Content Collections to manage blog posts with enhanced functionality:

**1. Configuration (`content-collections.ts`)**
```typescript
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "*.md",
  schema: (z) => ({
    title: z.string(),
    summary: z.string(),
    date: z.string(),
    author: z.string(),
    protected: z.boolean().optional(), // Custom field for access control
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document); // HTML compilation for Workers
    return {
      ...document,
      html,
    };
  },
});

export default defineConfig({
  collections: [posts],
});
```

**2. Blog Listing (`src/app/pages/Blog.tsx`)**
```typescript
import { allPosts } from "content-collections";

export function Blog() {
  return (
    <div>
      {allPosts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((post) => (
          <article key={post._meta.path}>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
            {post.protected && <span>🔒</span>}
          </article>
        ))}
    </div>
  );
}
```

**3. Individual Posts (`src/app/pages/BlogPost.tsx`)**
```typescript
import { allPosts } from "content-collections";

export function BlogPost({ params, ctx }: RequestInfo) {
  const post = allPosts.find(p => p._meta.path.replace(/\.md$/, "") === params.slug);
  
  // Protected content check
  if (post.protected && !ctx.user) {
    return <LoginRequired />;
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
```

### Markdown Posts

Create posts in the `content/posts/` directory:

```markdown
---
title: "My Blog Post"
summary: "A brief description of the post"
date: "2024-01-15"
author: "Your Name"
protected: false
---

# Your Content Here

Write your blog post content in Markdown...
```

### Protected Content

Set `protected: true` in frontmatter to require authentication:

```markdown
---
title: "Premium Content"
protected: true
---

This content requires login to view.
```

## Customization Guide

### 1. Adding New Frontmatter Fields

Extend the schema in `content-collections.ts`:

```typescript
schema: (z) => ({
  title: z.string(),
  summary: z.string(),
  date: z.string(),
  author: z.string(),
  protected: z.boolean().optional(),
  tags: z.array(z.string()).optional(), // New field
  category: z.string().optional(),      // New field
}),
```

### 2. Multiple Content Types

Add new collections for different content types:

```typescript
const pages = defineCollection({
  name: "pages",
  directory: "content/pages",
  include: "*.md",
  // ... configuration
});

const authors = defineCollection({
  name: "authors", 
  directory: "content/authors",
  include: "*.md",
  // ... configuration
});

export default defineConfig({
  collections: [posts, pages, authors],
});
```

### 3. Advanced Filtering

Create filtered views in your components:

```typescript
// Featured posts
const featuredPosts = allPosts.filter(post => post.featured);

// Posts by category
const techPosts = allPosts.filter(post => post.category === "tech");

// Recent posts (last 30 days)
const recentPosts = allPosts.filter(post => {
  const postDate = new Date(post.date);
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  return postDate > thirtyDaysAgo;
});
```

## Key Implementation Details

### Why HTML Compilation?

For maximum performance, we compile all Markdown files to HTML at build time rather than at runtime. This means the compiled content is embedded directly in the Worker, making content loading extremely fast and snappy.

The trade-off is that Workers have an uncompressed size limit (around 10MB), but you can publish many blog posts before reaching this limit. For images and media files, use the `public/` folder which becomes static assets in Cloudflare with much higher limits.

### Authentication Integration

The project integrates Content Collections with RedwoodSDK's authentication:

- Protected posts check `ctx.user` before rendering
- Dashboard shows only protected content for logged-in users
- Seamless redirect flow for authentication

### Performance Optimizations

- **Build-time Compilation**: Content is processed at build time and embedded in the Worker
- **Edge Deployment**: Runs on Cloudflare Workers for global performance
- **No Runtime Rendering**: No server-side Markdown compilation during requests

## Project Structure

```
├── content/
│   └── posts/           # Markdown blog posts
├── src/
│   ├── app/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Route components
│   │   └── Layout.tsx   # Shared layout
│   └── worker.tsx       # Main application entry
├── content-collections.ts # Content Collections config
├── package.json
└── wrangler.jsonc       # Cloudflare Workers config
```

## Deployment

```bash
pnpm release
```

This command handles everything: building, deploying to Cloudflare Workers, and setting up the database. Once complete, you'll receive a link to your deployed project.

## Contributing

This project demonstrates Content Collections integration patterns. Feel free to:

- Fork and extend for your use case
- Submit issues for bugs or improvements
- Share your own Content Collections + RedwoodSDK implementations

## Resources

- [Content Collections Documentation](https://www.content-collections.dev/)
- [RedwoodSDK Documentation](https://docs.rwsdk.com/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [WebAuthn/Passkeys](https://webauthn.guide/)

---

Built with ❤️ using RedwoodSDK and Content Collections