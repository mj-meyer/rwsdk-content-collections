import { LayoutProps } from "rwsdk/router";

export function Layout({ children, requestInfo }: LayoutProps) {
  const ctx = requestInfo?.ctx;
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafafa",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #e5e5e5",
          padding: "16px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#1a1a1a",
              margin: 0,
            }}
          >
            <a
              href="/"
              style={{
                color: "#1a1a1a",
                textDecoration: "none",
              }}
            >
              RWSDK Content Collections
            </a>
          </h1>

          <nav style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a
              href="/blog"
              style={{
                color: "#0066cc",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Blog
            </a>
            {ctx?.user ? (
              <a
                href="/dashboard"
                style={{
                  color: "#0066cc",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Dashboard
              </a>
            ) : (
              <a
                href="/user/login"
                style={{
                  color: "#fff",
                  backgroundColor: "#0066cc",
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                Login
              </a>
            )}
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <div style={{ flex: 1 }}>{children}</div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#fff",
          borderTop: "1px solid #e5e5e5",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              color: "#666",
              fontSize: "0.875rem",
              margin: 0,
            }}
          >
            Built with RedwoodSDK and RWSDK Content Collections
          </p>
        </div>
      </footer>
    </main>
  );
}

