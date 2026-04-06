"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const BackgroundContext = createContext<{
  showBackground: boolean;
  setShowBackground: (show: boolean) => void;
}>({
  showBackground: false,
  setShowBackground: () => {},
});

export function useBackground() {
  return useContext(BackgroundContext);
}

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [showBackground, setShowBackground] = useState(false);

  // Preload background image so it's ready when needed (e.g. after video ends)
  useEffect(() => {
    const img = new Image();
    img.src = "/background.png";
  }, []);

  return (
    <BackgroundContext.Provider value={{ showBackground, setShowBackground }}>
      {showBackground && (
        <>
          <div
            className="fixed inset-0 z-0 animate-fade-in pointer-events-none"
            style={{
              backgroundImage: "url(/background.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div
            className="fixed inset-0 z-0 animate-fade-in pointer-events-none"
            style={{ backgroundColor: "rgba(248, 244, 236, 0.85)" }}
          />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </BackgroundContext.Provider>
  );
}
