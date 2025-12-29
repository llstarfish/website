import type { Metadata } from "next";
import { Crimson_Pro, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

const crimsonPro = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Michael Shen",
  description: "Personal blog and research writings by Michael Shen (沈浩真)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${crimsonPro.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
