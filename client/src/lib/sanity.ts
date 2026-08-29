import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { slugify } from './utils';

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

/**
 * Helper to convert Sanity PortableText block array to markdown string
 */
export function portableTextToMarkdown(blocks: any): string {
  if (!blocks) return '';
  if (typeof blocks === 'string') return blocks;
  if (!Array.isArray(blocks)) return String(blocks);

  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        if (block._type === 'code' && block.code) {
          return `\`\`\`${block.language || ''}\n${block.code}\n\`\`\`\n`;
        }
        return '';
      }
      const text = block.children.map((child: any) => child.text || '').join('');
      if (block.style === 'h1') return `# ${text}\n`;
      if (block.style === 'h2') return `## ${text}\n`;
      if (block.style === 'h3') return `### ${text}\n`;
      if (block.style === 'blockquote') return `> ${text}\n`;
      return `${text}\n`;
    })
    .filter(Boolean)
    .join('\n');
}

export async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T | null> {
  try {
    const data = await sanityClient.fetch<T>(query, params);
    if (Array.isArray(data)) {
      return data.map((item: any) => normalizeSanityArticle(item)) as unknown as T;
    } else if (data && typeof data === 'object') {
      return normalizeSanityArticle(data) as unknown as T;
    }
    return data;
  } catch (error) {
    console.warn('SANITY CLIENT FETCH NOTICE (Falling back gracefully):', error);
    return null;
  }
}

function normalizeSanityArticle(item: any): any {
  if (!item || typeof item !== 'object') return item;
  if (item._type && item._type !== 'article' && item._type !== 'post' && item._type !== 'category') {
    return item;
  }

  // Ensure slug is clean slugified string
  const rawSlug = typeof item.slug === 'string' ? item.slug : item.slug?.current || '';
  if (rawSlug) {
    item.slug = slugify(rawSlug);
  } else if (item.title) {
    item.slug = slugify(item.title);
  }

  // Normalize content/body if it's PortableText array
  if (item.content && Array.isArray(item.content)) {
    item.content = portableTextToMarkdown(item.content);
  } else if (item.body && Array.isArray(item.body)) {
    item.content = portableTextToMarkdown(item.body);
  } else if (!item.content && item.body) {
    item.content = typeof item.body === 'string' ? item.body : String(item.body);
  }

  // Ensure excerpt fallback
  if (!item.excerpt && item.content) {
    item.excerpt = item.content.slice(0, 160).replace(/[#*`>]/g, '').trim() + '...';
  }

  // Calculate reading time fallback
  if (!item.readingTime && item.content) {
    const words = item.content.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    item.readingTime = `${mins} min read`;
  }

  return item;
}

export const GROQ_QUERIES = {
  // Query both "article" and "post" document types with field normalization
  ALL_ARTICLES: `*[_type in ["article", "post"] && !(_id in path("drafts.**"))] | order(publishedAt desc, _createdAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, pt::text(body), pt::text(content), ""),
    content,
    body,
    "coverImage": coalesce(coverImage.asset->url, image.asset->url, mainImage.asset->url, ""),
    "category": coalesce(category->name, category->title, category, "Engineering"),
    tags,
    "publishedAt": coalesce(publishedAt, _createdAt, "2026-01-01"),
    readingTime,
    featured,
    pinned,
    status,
    "author": coalesce(author->{
      name,
      "avatar": coalesce(avatar.asset->url, image.asset->url, ""),
      bio,
      role
    }, {
      "name": "Techniccal",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      "role": "Author"
    })
  }`,

  ARTICLE_BY_SLUG: `*[_type in ["article", "post"] && (slug.current == $slug || slug.current == $slugified || title == $slug || _id == $slug)][0] {
    "id": _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, pt::text(body), pt::text(content), ""),
    content,
    body,
    "coverImage": coalesce(coverImage.asset->url, image.asset->url, mainImage.asset->url, ""),
    "category": coalesce(category->name, category->title, category, "Engineering"),
    tags,
    "publishedAt": coalesce(publishedAt, _createdAt, "2026-01-01"),
    readingTime,
    featured,
    pinned,
    status,
    "author": coalesce(author->{
      name,
      "avatar": coalesce(avatar.asset->url, image.asset->url, ""),
      bio,
      role
    }, {
      "name": "Techniccal",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      "role": "Author"
    })
  }`,

  ALL_CATEGORIES: `*[_type == "category"] | order(name asc) {
    "id": _id,
    "name": coalesce(name, title, "General"),
    "slug": slug.current,
    description
  }`
};
