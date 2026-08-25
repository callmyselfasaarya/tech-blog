import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'pbxpf8xj';
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
export const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || '2026-03-01';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'pbxpf8xj',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2026-03-01',
  useCdn: false,
});

export const sanityClient = client;

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  return builder.image(source);
}

export async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  try {
    const data = await sanityClient.fetch<T>(query, params);
    return data;
  } catch (error) {
    console.error('SANITY CLIENT FETCH ERROR:', error);
    throw error;
  }
}

export const GROQ_QUERIES = {
  ALL_ARTICLES: `*[_type == "article" && !(_id in path("drafts.**"))] | order(publishedAt desc, _createdAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "coverImage": coverImage.asset->url,
    "category": category->name,
    tags,
    publishedAt,
    readingTime,
    featured,
    pinned,
    status,
    "author": author->{
      name,
      "avatar": avatar.asset->url,
      bio,
      role
    }
  }`,

  ARTICLE_BY_SLUG: `*[_type == "article" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    content,
    "coverImage": coverImage.asset->url,
    "category": category->name,
    tags,
    publishedAt,
    readingTime,
    featured,
    pinned,
    status,
    "author": author->{
      name,
      "avatar": avatar.asset->url,
      bio,
      role
    }
  }`,

  ALL_CATEGORIES: `*[_type == "category"] | order(name asc) {
    "id": _id,
    name,
    "slug": slug.current,
    description
  }`
};
