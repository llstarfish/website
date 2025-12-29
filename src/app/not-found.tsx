import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24 text-center">
      <h1 className="font-sans text-6xl font-semibold mb-4">404</h1>
      <h2 className="font-sans text-2xl font-medium mb-4">Page not found</h2>
      <p className="text-muted text-lg mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-accent text-white font-sans text-sm font-medium rounded hover:opacity-90 transition-opacity"
      >
        Go home
      </Link>
    </div>
  );
}
