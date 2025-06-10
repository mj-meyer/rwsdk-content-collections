import { RequestInfo } from "rwsdk/worker";
import { LogoutButton } from "@/app/components/LogoutButton";
import { allPosts } from "content-collections";

export function Dashboard({ ctx }: RequestInfo) {
  const protectedPosts = allPosts
    .filter((post) => post.protected)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
    >
      <header style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#1a1a1a",
          }}
        >
          Dashboard
        </h1>
        <p style={{ color: "#666", fontSize: "1.125rem" }}>
          Welcome to your personal dashboard
        </p>
      </header>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "32px",
          borderRadius: "12px",
          border: "1px solid #e5e5e5",
          marginBottom: "32px",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1a1a1a",
          }}
        >
          Account Information
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "#0066cc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "1.25rem",
              fontWeight: "600",
            }}
          >
            {ctx.user?.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              {ctx.user?.username || "Unknown User"}
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#666",
                margin: 0,
              }}
            >
              Authenticated with passkey
            </p>
          </div>
        </div>

        <LogoutButton />
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "32px",
          borderRadius: "12px",
          border: "1px solid #e5e5e5",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#1a1a1a",
          }}
        >
          Protected Posts
        </h2>

        {protectedPosts.length === 0 ? (
          <p style={{ color: "#666", textAlign: "center", padding: "32px" }}>
            No protected posts available.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {protectedPosts.map((post) => {
              const slug = post._meta.path.replace(/\.md$/, "");

              return (
                <article
                  key={post._meta.path}
                  style={{
                    padding: "20px",
                    backgroundColor: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      marginBottom: "8px",
                      lineHeight: "1.3",
                    }}
                  >
                    <a
                      href={`/blog/${slug}`}
                      style={{
                        color: "#1a1a1a",
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      {post.title}
                      <span style={{ fontSize: "0.875rem", color: "#666" }}>🔒</span>
                    </a>
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      fontSize: "0.875rem",
                      color: "#666",
                      marginBottom: "12px",
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

                  <p
                    style={{
                      color: "#444",
                      lineHeight: "1.5",
                      marginBottom: "12px",
                      fontSize: "0.875rem",
                    }}
                  >
                    {post.summary.slice(0, 150)}...
                  </p>

                  <a
                    href={`/blog/${slug}`}
                    style={{
                      color: "#0066cc",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                    }}
                  >
                    Read more →
                  </a>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
