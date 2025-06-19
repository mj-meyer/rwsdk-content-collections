import { allPosts } from "content-collections";

export function getAllPosts() {
  return allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string) {
  return allPosts.find((p) => p._meta.path.replace(/\.md$/, "") === slug);
}

export function getLatestPosts(count: number) {
  return getAllPosts().slice(0, count);
}

export function getPublicPosts() {
  return getAllPosts().filter((post) => !post.protected);
}

export function getProtectedPosts() {
  return getAllPosts().filter((post) => post.protected);
}