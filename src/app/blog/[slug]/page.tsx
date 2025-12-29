import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} - Michael`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = await markdownToHtml(post.content);

  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-10">
        <Link
          href="/blog"
          className="inline-block font-sans text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          &larr; Back to blog
        </Link>
        <time className="block text-sm text-muted">{post.date}</time>
        <h1 className="font-serif text-4xl font-semibold tracking-tight mt-2 leading-tight">
          {post.title}
        </h1>
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  );
}
