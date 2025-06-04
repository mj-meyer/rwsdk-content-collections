import { allPosts } from "content-collections";

export function Blog() {
  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {allPosts.map((post) => (
          <li key={post._meta.path}>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </li>
        ))}
      </ul>
    </main>
  );
}
