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
          This site is where I write down my thoughts and thinking —
          life, the world we live in, and what lies ahead.
        </p>
        <p>
          My interests sit at the intersection of technology, and
          finance. I spend a lot of time reading and thinking about how we got
          here and what&apos;s ahead.
        </p>

        <blockquote className="border-l-2 border-muted pl-4 italic text-muted">
          <p>
            &ldquo;The reasonable man adapts himself to the world; the
            unreasonable one persists in trying to adapt the world to himself.
            Therefore all progress depends on the unreasonable man.&rdquo;
          </p>
          <footer className="text-sm mt-2 not-italic">— George Bernard Shaw</footer>
        </blockquote>
      </div>
    </div>
  );
}
