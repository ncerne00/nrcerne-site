import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const contentDirectory = path.join(process.cwd(), 'src/content');

export type PostMeta = {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  thumbnail: string;
  slug: string;
};

export type Post = {
  content: string;
  meta: PostMeta;
};

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(contentDirectory, 'blog', `${slug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      content,
      meta: {
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags,
        thumbnail: data.thumbnail,
        slug,
      },
    };
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const blogDir = path.join(contentDirectory, 'blog');
  
  const files = fs.readdirSync(blogDir);
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      const slug = file.replace(/\.mdx$/, '');
      
      return {
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags,
        thumbnail: data.thumbnail,
        slug,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return posts;
}

export async function serializeMDX(content: string) {
  return serialize(content);
}