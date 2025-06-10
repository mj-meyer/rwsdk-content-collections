import { allPosts } from "content-collections";
import { RequestInfo } from "rwsdk/worker";

export function HomePage({ ctx }: RequestInfo) {
  const recentPosts = allPosts
    .filter((post) => !post.protected) // Only show public posts on home
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: "#fff",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "#1a1a1a",
              marginBottom: "24px",
              lineHeight: "1.2",
            }}
          >
            Welcome to RWSDK Content Collections
          </h2>

          <p
            style={{
              fontSize: "1.25rem",
              color: "#666",
              marginBottom: "40px",
              lineHeight: "1.6",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            A modern blog powered by RedwoodSDK and Content Collections.
            Discover stories, insights, and adventures from our team.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/blog"
              style={{
                color: "#fff",
                backgroundColor: "#0066cc",
                textDecoration: "none",
                padding: "16px 32px",
                borderRadius: "8px",
                fontSize: "1.125rem",
                fontWeight: "600",
                transition: "background-color 0.2s ease",
              }}
            >
              Read the Blog
            </a>

            {!ctx.user && (
              <a
                href="/user/login"
                style={{
                  color: "#0066cc",
                  backgroundColor: "transparent",
                  border: "2px solid #0066cc",
                  textDecoration: "none",
                  padding: "14px 32px",
                  borderRadius: "8px",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                }}
              >
                Get Started
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section
        style={{
          padding: "80px 20px",
          backgroundColor: "#fafafa",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h3
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "48px",
              color: "#1a1a1a",
            }}
          >
            Latest Posts
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            {recentPosts.map((post) => {
              const slug = post._meta.path.replace(/\.md$/, "");

              return (
                <article
                  key={post._meta.path}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    padding: "24px",
                    height: "fit-content",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "bold",
                      marginBottom: "12px",
                      lineHeight: "1.3",
                    }}
                  >
                    <a
                      href={`/blog/${slug}`}
                      style={{
                        color: "#1a1a1a",
                        textDecoration: "none",
                      }}
                    >
                      {post.title}
                    </a>
                  </h4>

                  <p
                    style={{
                      color: "#666",
                      lineHeight: "1.5",
                      marginBottom: "16px",
                      fontSize: "0.875rem",
                    }}
                  >
                    {post.summary.slice(0, 120)}...
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "0.75rem",
                      color: "#888",
                    }}
                  >
                    <span>By {post.author}</span>
                    <time>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </article>
              );
            })}
          </div>

          <div style={{ textAlign: "center" }}>
            <a
              href="/blog"
              style={{
                color: "#0066cc",
                textDecoration: "none",
                fontSize: "1.125rem",
                fontWeight: "500",
              }}
            >
              View All Posts →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
