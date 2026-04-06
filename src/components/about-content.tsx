"use client";

import { useEffect, useState } from "react";
import { VideoPlayer } from "@/components/video-player";
import { useBackground } from "@/components/background-provider";

const VIEWED_KEY = "about-video-viewed";

export function AboutContent() {
  const { setShowBackground } = useBackground();
  const [hasViewed, setHasViewed] = useState<boolean | null>(null);
  const [showQuote, setShowQuote] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [lightsOn, setLightsOn] = useState(false);

  useEffect(() => {
    const viewed = localStorage.getItem(VIEWED_KEY) === "true";
    setHasViewed(viewed);
    if (viewed) {
      setShowQuote(true);
      setShowAbout(true);
      setVisibleLines(4);
      setLightsOn(true);
      setShowBackground(true);
    }
  }, [setShowBackground]);

  function handleFadeStart() {
    setShowQuote(true);
  }

  function handleVideoEnded() {
    setTimeout(() => {
      setShowAbout(true);
      let line = 1;
      const interval = setInterval(() => {
        setVisibleLines(line);
        if (line === 4) {
          clearInterval(interval);
          setTimeout(() => {
            setLightsOn(true);
            setShowBackground(true);
            localStorage.setItem(VIEWED_KEY, "true");
          }, 3000);
        }
        line++;
      }, 600);
    }, 500);
  }

  if (hasViewed === null) return null;

  const quoteColor = lightsOn ? "text-muted" : "text-neutral-400";
  const attributionColor = lightsOn ? "text-muted" : "text-neutral-500";
  const headingColor = lightsOn ? "text-foreground" : "text-white";
  const bodyColor = lightsOn ? "text-foreground" : "text-neutral-300";
  const subtitleColor = lightsOn ? "text-muted" : "text-neutral-400";
  const visible = "opacity-100 translate-y-0";
  const hidden = "opacity-0 translate-y-2";

  return (
    <>
      {/* Dimmed backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 transition-opacity duration-1000 ${
          lightsOn ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />

      {/* Scrollable content layer */}
      <div
        className={`fixed inset-0 z-50 overflow-y-auto ${
          lightsOn ? "pointer-events-none" : ""
        }`}
      >
        <div className="min-h-full flex flex-col items-center justify-center px-6 py-8 pb-24 sm:py-12 sm:pb-12">
          {/* Quote */}
          <div
            className={`mb-10 sm:mb-10 text-center max-w-xl transition-opacity duration-[2000ms] ${
              showQuote ? "opacity-100" : "opacity-0"
            }`}
          >
            <blockquote
              className={`italic text-sm sm:text-base leading-relaxed transition-colors duration-1000 ${quoteColor}`}
            >
              <p>&ldquo;The reasonable man adapts himself to the world.</p>
              <p className="mt-2 sm:mt-3">
                The unreasonable one persists in trying to adapt the world to
                himself.
              </p>
              <p className="mt-2 sm:mt-3">
                Therefore all progress depends on the unreasonable man.&rdquo;
              </p>
              <footer
                className={`text-xs sm:text-sm mt-4 not-italic transition-colors duration-1000 ${attributionColor}`}
              >
                — George Bernard Shaw
              </footer>
            </blockquote>
          </div>

          {/* Video */}
          <div className="w-full max-w-2xl pointer-events-auto">
            <VideoPlayer
              src="/penguin.mp4"
              className="w-full"
              onFadeStart={handleFadeStart}
              onEnded={handleVideoEnded}
            />
            <p className="text-xs text-neutral-600 mt-2">
              Video borrowed from Poseidon Aerospace. Not affiliated.
            </p>
          </div>

          {/* About — staggered reveal */}
          <div
            className={`mt-10 sm:mt-10 w-full max-w-2xl text-left transition-opacity duration-500 ${
              showAbout ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1
              className={`font-serif text-2xl sm:text-3xl font-semibold tracking-tight mb-1 transition-all duration-1000 ${
                visibleLines >= 1 ? visible : hidden
              } ${headingColor}`}
            >
              About
            </h1>
            <p
              className={`text-sm mb-4 transition-all duration-1000 ${
                visibleLines >= 1 ? visible : hidden
              } ${subtitleColor}`}
            >
              沈浩祯 · Haozhen Shen (e/acc)
            </p>
            <p
              className={`text-sm sm:text-base transition-all duration-1000 ${
                visibleLines >= 2 ? visible : hidden
              } ${bodyColor}`}
            >
              I studied CS and Math at the University of Toronto.
            </p>
            <p
              className={`text-sm sm:text-base mt-2 sm:mt-3 transition-all duration-1000 ${
                visibleLines >= 3 ? visible : hidden
              } ${bodyColor}`}
            >
              I believe lifelong happiness comes from working on hard things you
              enjoy and with like-minded people.
            </p>
            <p
              className={`text-sm sm:text-base mt-2 sm:mt-3 transition-all duration-1000 ${
                visibleLines >= 4 ? visible : hidden
              } ${bodyColor}`}
            >
              Sit tight and embrace the acceleration.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
