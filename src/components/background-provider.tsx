"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

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

  return (
    <BackgroundContext.Provider value={{ showBackground, setShowBackground }}>
      {showBackground && (
        <div
          className="fixed inset-0 -z-10 animate-fade-in"
          style={{
            backgroundImage: "url(/background.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {showBackground && (
        <div
          className="fixed inset-0 -z-[5] animate-fade-in"
          style={{ backgroundColor: "rgba(248, 244, 236, 0.85)" }}
        />
      )}

      {children}
    </BackgroundContext.Provider>
  );
}
