import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <section className="mb-16">
        <div className="mb-4">
          <h1 className="font-serif text-3xl font-semibold tracking-tight">
            Michael Shen
          </h1>
          <p className="text-sm text-muted mt-1">沈浩祯 · Haozhen Shen</p>
        </div>
        <p className="text-lg text-muted leading-relaxed">
          A place where I straighten out my thoughts and write them down.
          Life, the world we live in, AI, and what lies ahead.
        </p>
      </section>

      <section>
        <h2 className="font-sans text-xl font-semibold tracking-tight mb-8">
          Recent Writing
        </h2>
        <div className="space-y-8">
          {recentPosts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <time className="text-sm text-muted">{post.date}</time>
                <h3 className="font-sans text-lg font-medium mt-1 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted mt-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
        <Link
          href="/blog"
          className="inline-block mt-10 font-sans text-sm text-accent hover:underline"
        >
          View all posts &rarr;
        </Link>
      </section>
    </div>
  );
}
