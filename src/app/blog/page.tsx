import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Writing - Michael Shen",
  description: "Essays and research writings by Michael Shen",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-12">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          Writing
        </h1>
        <p className="text-muted mt-3">
          Essays, research notes, and explorations.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet. Check back soon.</p>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <time>{post.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTimeMinutes} min read</span>
                </div>
                <h2 className="font-serif text-xl font-medium mt-1 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted mt-2 leading-relaxed">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
