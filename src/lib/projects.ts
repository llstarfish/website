import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  url: string;
  repo: string;
  image: string;
  featured: boolean;
  date: string;
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName): Project => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        description: data.description || "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        url: data.url || "",
        repo: data.repo || "",
        image: data.image || "",
        featured: Boolean(data.featured),
        date: data.date || "",
      };
    })
    .sort((a, b) => {
      // Featured first, then by date descending
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.date > b.date ? -1 : 1;
    });

  return projects;
}
