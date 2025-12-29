"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          background: "#f8f4ec",
          color: "#2c2c2c",
          fontFamily: "Georgia, serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1
            style={{
              fontFamily: "system-ui, sans-serif",
              fontSize: "2.5rem",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              color: "#5c5c5c",
              fontSize: "1.125rem",
              marginBottom: "2rem",
            }}
          >
            A critical error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#8b4513",
              color: "white",
              fontFamily: "system-ui, sans-serif",
              fontSize: "0.875rem",
              fontWeight: 500,
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
