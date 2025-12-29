"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h1 className="font-sans text-4xl font-semibold mb-4">
        Something went wrong
      </h1>
      <p className="text-muted text-lg mb-8">
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="inline-block px-6 py-3 bg-accent text-white font-sans text-sm font-medium rounded hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}
