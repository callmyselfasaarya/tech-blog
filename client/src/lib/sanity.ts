import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'pbxpf8xj';
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
export const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || '2026-01-01';

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  return builder.image(source);
}

export async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T | null> {
  try {
    const data = await sanityClient.fetch<T>(query, params);
    return data;
  } catch (e) {
    // Fallback to fetch API if client encounters runtime issue
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encodedQuery}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const json = await res.json();
        return json.result as T;
      }
    } catch (err) {}
  }
  return null;
}

export const GROQ_QUERIES = {
  ALL_ARTICLES: `*[_type == "article" && status == "published"] | order(publishedAt desc) {
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
