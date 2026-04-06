import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import { TweetEmbed } from "@/components/tweet-embed";

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

const TWEET_REGEX =
  /<div class="embed">\s*<blockquote class="twitter-tweet">.*?<a href="https:\/\/twitter\.com\/\w+\/status\/(\d+)">.*?<\/blockquote>\s*<\/div>/gs;

function renderContentWithTweets(html: string) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  const regex = new RegExp(TWEET_REGEX);
  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <div
          key={`html-${lastIndex}`}
          className="prose"
          dangerouslySetInnerHTML={{ __html: html.slice(lastIndex, match.index) }}
        />
      );
    }
    parts.push(
      <Suspense key={`tweet-${match[1]}`} fallback={<div className="embed text-muted text-sm">Loading tweet...</div>}>
        <TweetEmbed id={match[1]} />
      </Suspense>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < html.length) {
    parts.push(
      <div
        key={`html-${lastIndex}`}
        className="prose"
        dangerouslySetInnerHTML={{ __html: html.slice(lastIndex) }}
      />
    );
  }

  return parts;
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
        <div className="flex items-center gap-2 text-sm text-muted">
          <time>{post.date}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readTimeMinutes} min read</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight mt-2 leading-tight">
          {post.title}
        </h1>
      </header>

      {renderContentWithTweets(contentHtml)}
    </article>
  );
}
