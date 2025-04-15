const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID!;

if (!PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_PROJECT_ID environment variable');
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

if (!API_URL) {
  throw new Error('Missing NEXT_PUBLIC_API_URL environment variable');
}

interface Blog {
  id: string;
  slug: string;
  title: string;
  publishedAt?: string;
  author: { name: string, image: string };
}

export async function getBlogPosts() {
  try {
    const response = await fetch(new URL(`/api/blog/${PROJECT_ID}`, API_URL).toString());

    return await response.json() as unknown as Blog[];
  } catch (err) {
    console.error(err);
    return [];
  }
}

export interface BlogPost {
  author: { name: string, image?: string };
  title: string;
  slug: string;
  html: string;
  publishedAt?: string | number;
  createdAt: string | number;
  updatedAt: string | number;
}

export async function getBlogPost(slug: string) {
  try {
    const response = await fetch(new URL(`/api/blog/${PROJECT_ID}/${slug}`, API_URL).toString());
    const post = await response.json() as unknown as BlogPost | null;

    return post;
  } catch (err) {
    console.error(err);
    return null;
  }
}
