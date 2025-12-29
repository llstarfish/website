import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

function extractExcerpt(content: string, maxLength = 160): string {
  // Remove any leading whitespace and find the first paragraph
  const trimmed = content.trim();

  // Split by double newlines to get paragraphs
  const paragraphs = trimmed.split(/\n\n+/);

  // Get the first non-empty paragraph that isn't a heading
  const firstParagraph = paragraphs.find(
    (p) => p.trim() && !p.trim().startsWith("#")
  );

  if (!firstParagraph) return "";

  // Clean up markdown syntax (bold, italic, links, etc.)
  const cleaned = firstParagraph
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1") // bold/italic
    .replace(/`([^`]+)`/g, "$1") // inline code
    .trim();

  // Truncate if needed
  if (cleaned.length <= maxLength) return cleaned;

  // Cut at word boundary
  const truncated = cleaned.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > 0 ? truncated.slice(0, lastSpace) + "..." : truncated + "...";
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Auto-generate excerpt from the first paragraph of content
      const excerpt = extractExcerpt(content);

      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        excerpt,
        content,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    excerpt: extractExcerpt(content),
    content,
  };
}
