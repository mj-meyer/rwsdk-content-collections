import { allPosts } from "content-collections";
import { RequestInfo } from "rwsdk/worker";

export function BlogPost({ params, ctx }: RequestInfo) {
  const { slug } = params;
  const post = allPosts.find((p) => p._meta.path.replace(/\.md$/, "") === slug);

  if (!post) {
    return (
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", color: "#666" }}>Post not found</h1>
        <p style={{ color: "#888", marginTop: "16px" }}>
          The blog post you're looking for doesn't exist.
        </p>
        <a
          href="/blog"
          style={{
            color: "#0066cc",
            textDecoration: "none",
            fontSize: "1rem",
            marginTop: "24px",
            display: "inline-block",
          }}
        >
          ← Back to blog
        </a>
      </main>
    );
  }

  // Check if post is protected and user is not logged in
  if (post.protected && !ctx.user) {
    return (
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", color: "#666" }}>Login Required</h1>
        <p style={{ color: "#888", marginTop: "16px" }}>
          This post requires you to be logged in to view it.
        </p>
        <div style={{ marginTop: "24px", display: "flex", gap: "16px", justifyContent: "center" }}>
          <a
            href="/user/login"
            style={{
              color: "#fff",
              backgroundColor: "#0066cc",
              textDecoration: "none",
              fontSize: "1rem",
              padding: "12px 24px",
              borderRadius: "6px",
              fontWeight: "500",
            }}
          >
            Login
          </a>
          <a
            href="/blog"
            style={{
              color: "#0066cc",
              textDecoration: "none",
              fontSize: "1rem",
              padding: "12px 24px",
            }}
          >
            ← Back to blog
          </a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
      <nav style={{ marginBottom: "32px" }}>
        <a
          href="/blog"
          style={{
            color: "#0066cc",
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
        >
          ← Back to blog
        </a>
      </nav>

      <article>
        <header
          style={{
            marginBottom: "32px",
            paddingBottom: "24px",
            borderBottom: "1px solid #e5e5e5",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              lineHeight: "1.2",
              marginBottom: "16px",
              color: "#1a1a1a",
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "0.875rem",
              color: "#666",
            }}
          >
            <span>By {post.author}</span>
            <span>•</span>
            <time>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>

        <div
          style={{
            lineHeight: "1.7",
            fontSize: "1.125rem",
            color: "#333",
          }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>

      <footer
        style={{
          marginTop: "48px",
          paddingTop: "24px",
          borderTop: "1px solid #e5e5e5",
          textAlign: "center",
        }}
      >
        <a
          href="/blog"
          style={{
            color: "#0066cc",
            textDecoration: "none",
            fontSize: "1rem",
            fontWeight: "500",
          }}
        >
          ← Back to all posts
        </a>
      </footer>
    </main>
  );
}

