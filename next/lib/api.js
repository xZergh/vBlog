import client from './sanity';

const blogFields = `
    title, 
    subtitle, 
    'slug': slug.current,
    date,
    'author': author->{name, 'avatar': avatar.asset->url},
    'coverImage': coverImage.asset->url
`;

function getSortDirection(date) {
  return typeof date === 'string' && date.toLowerCase() === 'asc'
    ? 'asc'
    : 'desc';
}

export async function getBlogs(page = 0, limit = 6, date = 'desc') {
  const offset = page * limit;
  const sortDirection = getSortDirection(date);

  const res = await client.fetch(
    `*[_type == "blog"] | order(date ${sortDirection}) [${offset}...${offset + limit}] {${blogFields}}`
  );
  return res;
}

export async function getAllBlogs(date = 'desc') {
  const sortDirection = getSortDirection(date);
  const res = await client.fetch(
    `*[_type == "blog"] | order(date ${sortDirection}) {${blogFields}}`
  );
  return res;
}

export async function getBlogBySlug(slug) {
  if (typeof slug !== 'string' || !slug.trim()) {
    return null;
  }

  try {
    const res = await client
      .fetch(
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
      )
      .then(res => res?.[0]);
    return res;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}
