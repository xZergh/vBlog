import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllBlogs } from '../../lib/api';

type SortOrder = 'asc' | 'desc';

type BlogSummary = {
  slug: string;
  title?: string;
  subtitle?: string;
  date?: string;
  author?: {
    name?: string;
    avatar?: string;
  };
  coverImage?: string;
};

type BlogsSuccessResponse = {
  blogs: BlogSummary[];
  hasMore: boolean;
  total: number;
  page: number;
  limit: number;
};

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogsSuccessResponse | ErrorResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const queryPage = Array.isArray(req.query.page)
      ? req.query.page[0]
      : req.query.page;
    const queryLimit = Array.isArray(req.query.limit)
      ? req.query.limit[0]
      : req.query.limit;
    const queryDate = Array.isArray(req.query.date)
      ? req.query.date[0]
      : req.query.date;

    const pageNum = parseInt(queryPage ?? '0', 10);
    const limitNum = parseInt(queryLimit ?? '6', 10);
    const offset = pageNum * limitNum;

    if (isNaN(pageNum) || isNaN(limitNum) || pageNum < 0 || limitNum <= 0) {
      return res.status(400).json({ message: 'Invalid pagination parameters' });
    }

    const normalizedDate =
      typeof queryDate === 'string' ? queryDate.toLowerCase() : 'desc';
    const sortOrder: SortOrder = normalizedDate === 'asc' ? 'asc' : 'desc';

    const allBlogs = await getAllBlogs(sortOrder);
    const safeBlogs = Array.isArray(allBlogs) ? allBlogs : [];
    const paginatedBlogs = safeBlogs.slice(offset, offset + limitNum);
    const hasMore = offset + limitNum < safeBlogs.length;

    return res.status(200).json({
      blogs: paginatedBlogs,
      hasMore,
      total: safeBlogs.length,
      page: pageNum,
      limit: limitNum,
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
