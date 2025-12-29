import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-border">
      <nav className="mx-auto max-w-2xl px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-serif text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
              Michael Shen
            </span>
            <span className="text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity">
              沈浩祯 · Haozhen Shen

            </span>
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href="/blog"
              className="px-3 py-1.5 font-sans text-sm text-muted hover:text-foreground hover:bg-border/50 rounded transition-all"
            >
              Writing
            </Link>
            <span className="text-border">/</span>
            <Link
              href="/about"
              className="px-3 py-1.5 font-sans text-sm text-muted hover:text-foreground hover:bg-border/50 rounded transition-all"
            >
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
