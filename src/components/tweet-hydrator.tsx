"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

export function TweetHydrator() {
  useEffect(() => {
    if (window.twttr) {
      window.twttr.widgets.load();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => window.twttr?.widgets.load();
    document.body.appendChild(script);
  }, []);

  return null;
}
