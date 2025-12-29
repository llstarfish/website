import Link from "next/link";
import { X, LinkedinIcon } from "lucide-react";

export const metadata = {
  title: "About - Michael Shen",
  description: "About Michael Shen (沈浩祯)",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-3xl font-semibold tracking-tight mb-2">
        About
      </h1>
      <p className="text-sm text-muted mb-8">沈浩祯 · Haozhen Shen</p>
      <div className="prose">
        <p>
          I studied Computer Science and Mathematics at the University of
          Toronto, followed by a Master&apos;s in Statistics.
        </p>
        <p>
          This site is where I write down my thoughts and thinking — on life,
          the world we live in, finance, AI, and what lies ahead.
        </p>
        <p>
          My interests sit at the intersection of software, AI, blockchain, and
          finance. I spend a lot of time reading and thinking about how we got
          here and what&apos;s ahead.
        </p>
      </div>
      <div className="mt-12 flex gap-5">
        <Link
          href="https://x.com/mshen223"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
          aria-label="Twitter"
        >
          <X size={20} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/michael-shen-0339791b9/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <LinkedinIcon size={20} />
        </Link>
      </div>
    </div>
  );
}
