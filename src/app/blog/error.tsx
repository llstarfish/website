"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Blog error:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h1 className="font-sans text-4xl font-semibold mb-4">
        Unable to load blog content
      </h1>
      <p className="text-muted text-lg mb-8">
        There was a problem loading this content. Please try again.
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="inline-block px-6 py-3 bg-accent text-white font-sans text-sm font-medium rounded hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
        <Link
          href="/blog"
          className="inline-block px-6 py-3 border border-border text-foreground font-sans text-sm font-medium rounded hover:bg-border/30 transition-colors"
        >
          Back to blog
        </Link>
      </div>
    </div>
  );
}
