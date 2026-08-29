import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || 'pbxpf8xj';
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || 'production';
export const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION || '2026-03-01';

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true
});

export const sanityClient = client;

const builder = imageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  if (!source) return '';
  try {
    return builder.image(source).url();
  } catch (e) {
    return '';
  }
}

export async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T | null> {
  try {
    const data = await sanityClient.fetch<T>(query, params);
    return data;
  } catch (error) {
    console.warn('SANITY CLIENT FETCH NOTICE (Falling back gracefully):', error);
    return null;
  }
}

export const GROQ_QUERIES = {
  // Query both "article" and "post" document types with field normalization
  ALL_ARTICLES: `*[_type in ["article", "post"] && !(_id in path("drafts.**"))] | order(publishedAt desc, _createdAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, pt::text(body), ""),
    "content": coalesce(content, body, ""),
    "coverImage": coalesce(coverImage.asset->url, image.asset->url, ""),
    "category": coalesce(category->name, "General"),
    tags,
    publishedAt,
    readingTime,
    featured,
    pinned,
    status,
    "author": coalesce(author->{
      name,
      "avatar": avatar.asset->url,
      bio,
      role
    }, {
      "name": "Techniccal Editorial",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      "role": "Author"
    })
  }`,

  ARTICLE_BY_SLUG: `*[_type in ["article", "post"] && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, pt::text(body), ""),
    "content": coalesce(content, body, ""),
    "coverImage": coalesce(coverImage.asset->url, image.asset->url, ""),
    "category": coalesce(category->name, "General"),
    tags,
    publishedAt,
    readingTime,
    featured,
    pinned,
    status,
    "author": coalesce(author->{
      name,
      "avatar": avatar.asset->url,
      bio,
      role
    }, {
      "name": "Techniccal Editorial",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      "role": "Author"
    })
  }`,

  ALL_CATEGORIES: `*[_type == "category"] | order(name asc) {
    "id": _id,
    name,
    "slug": slug.current,
    description
  }`
};
