import client from './sanity';
import type { TypedObject } from '@portabletext/types';

type SortDirection = 'asc' | 'desc';

export type BlogAuthor = {
  name?: string;
  avatar?: string;
};

export type Blog = {
  title?: string;
  subtitle?: string;
  slug: string;
  date?: string;
  author?: BlogAuthor;
  coverImage?: string;
  content?: TypedObject[];
};

const blogFields = `
    title, 
    subtitle, 
    'slug': slug.current,
    date,
    'author': author->{name, 'avatar': avatar.asset->url},
    'coverImage': coverImage.asset->url
`;

function getSortDirection(date: string): SortDirection {
  return date.toLowerCase() === 'asc' ? 'asc' : 'desc';
}

export async function getBlogs(
  page = 0,
  limit = 6,
  date: SortDirection = 'desc'
): Promise<Blog[]> {
  const offset = page * limit;
  const sortDirection = getSortDirection(date);

  return client.fetch(
    `*[_type == "blog"] | order(date ${sortDirection}) [${offset}...${offset + limit}] {${blogFields}}`
  );
}

export async function getAllBlogs(
  date: SortDirection = 'desc'
): Promise<Blog[]> {
  const sortDirection = getSortDirection(date);
  return client.fetch(
    `*[_type == "blog"] | order(date ${sortDirection}) {${blogFields}}`
  );
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  if (!slug.trim()) {
    return null;
  }

  try {
    const result = await client.fetch<Blog[]>(
      `*[_type == "blog" && slug.current == $slug] {
      ${blogFields}, content[]{
        ..., 
        _type == "image" => {
          ...,
          "asset": asset->
        }
      }
    }`,
      {
        slug,
      }
    );

    return result?.[0] ?? null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}
