import { allPosts } from "content-collections";

export function Blog() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <header style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '16px', color: '#1a1a1a' }}>
          Blog Posts
        </h1>
        <p style={{ color: '#666', fontSize: '1.125rem' }}>
          Latest articles and updates
        </p>
      </header>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {allPosts
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((post) => {
            const slug = post._meta.path.replace(/\.md$/, '');
            
            return (
              <article 
                key={post._meta.path}
                style={{ 
                  border: '1px solid #e5e5e5', 
                  borderRadius: '12px', 
                  padding: '24px',
                  backgroundColor: '#fafafa',
                }}
              >
                <header style={{ marginBottom: '16px' }}>
                  <h2 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}>
                    <a 
                      href={`/blog/${slug}`}
                      style={{ 
                        color: '#1a1a1a', 
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      {post.title}
                      {post.protected && (
                        <span style={{ fontSize: '0.875rem', color: '#666' }}>🔒</span>
                      )}
                    </a>
                  </h2>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px', 
                    fontSize: '0.875rem', 
                    color: '#666' 
                  }}>
                    <span>By {post.author}</span>
                    <span>•</span>
                    <time>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</time>
                  </div>
                </header>
                
                <p style={{ 
                  color: '#444', 
                  lineHeight: '1.6', 
                  marginBottom: '16px',
                  fontSize: '1rem'
                }}>
                  {post.summary}
                </p>
                
                <a 
                  href={`/blog/${slug}`}
                  style={{ 
                    color: '#0066cc', 
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Read more →
                </a>
              </article>
            );
          })}
      </div>
    </div>
  );
}
