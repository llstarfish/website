import Link from "next/link";
import { X, LinkedinIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Michael Shen
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://x.com/mshenshz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <X size={18} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/michael-shen-0339791b9/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
