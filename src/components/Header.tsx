"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBackground } from "@/components/background-provider";

const links = [
  { href: "/blog", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { showBackground } = useBackground();
  const isAboutPlaying = pathname === "/about" && !showBackground;

  return (
    <>
      <header className="border-b border-border">
        <nav className="mx-auto max-w-2xl px-6 py-5">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-baseline gap-2">
              <span className="font-serif text-xl font-semibold text-foreground group-hover:text-accent transition-colors whitespace-nowrap">
                Michael Shen
              </span>
              <span className="hidden sm:inline text-xs text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                沈浩祯 · Haozhen Shen
              </span>
            </Link>

            {/* Desktop nav — inline */}
            <div className="hidden sm:flex items-center gap-1">
              {links.map((link, i) => (
                <span key={link.href} className="flex items-center gap-1">
                  {i > 0 && <span className="text-border">/</span>}
                  <Link
                    href={link.href}
                    className={`px-3 py-1.5 font-sans text-sm rounded transition-all ${
                      pathname.startsWith(link.href)
                        ? "text-foreground"
                        : "text-muted hover:text-foreground hover:bg-border/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile nav — floating bottom pill */}
      <div className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 sm:hidden transition-opacity duration-500 ${
        isAboutPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}>
        <nav className="flex items-center gap-1 bg-foreground/90 backdrop-blur-md rounded-full px-2 py-1.5 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-xs px-4 py-2 rounded-full transition-all ${
                pathname.startsWith(link.href)
                  ? "bg-background text-foreground"
                  : "text-background/70 active:bg-background/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
