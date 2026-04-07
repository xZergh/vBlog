import React from 'react';
import type { ReactNode } from 'react';
import useSWRInfinite from 'swr/infinite';
import CardItem from '../components/CardItem';
import CardListItem from '../components/CardListItem';
import { Col } from 'react-bootstrap';
import type { Blog } from '../lib/api';

type BlogPageResponse = {
  blogs: Blog[];
  hasMore: boolean;
  total: number;
  page: number;
  limit: number;
};

type FilterState = {
  view?: { list?: boolean };
  date?: { asc?: boolean } | 'asc' | 'desc';
};

type UseGetBlogsPagesParams = {
  initialData: Blog[];
  filter: FilterState;
  pageSize?: number;
  autoload?: boolean;
};

type UseGetBlogsPagesResult = {
  blogs: Blog[];
  renderBlogs: () => ReactNode;
  loadMore: () => void;
  isLoading: boolean;
  isLoadingMore: boolean;
  isReachingEnd: boolean;
  isEmpty: boolean;
  error: Error | undefined;
  mutate: () => Promise<BlogPageResponse[] | undefined>;
};

const fetcher = async (url: string): Promise<BlogPageResponse> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<BlogPageResponse>;
};

export const useGetBlogsPages = ({
  initialData,
  filter,
  pageSize = 6,
  autoload = false,
}: UseGetBlogsPagesParams): UseGetBlogsPagesResult => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isClient = mounted && typeof window !== 'undefined';

  const getKey = React.useCallback(
    (pageIndex: number, previousPageData: BlogPageResponse | null) => {
      if (!isClient) {
        return null;
      }
      if (previousPageData && !previousPageData.hasMore) {
        return null;
      }

      let sortDirection: 'asc' | 'desc' = 'desc';
      if (filter?.date) {
        if (typeof filter.date === 'object' && 'asc' in filter.date) {
          sortDirection = filter.date.asc ? 'asc' : 'desc';
        } else if (filter.date === 'asc' || filter.date === 'desc') {
          sortDirection = filter.date;
        }
      }

      return `/api/blogs?page=${pageIndex}&limit=${pageSize}&date=${sortDirection}`;
    },
    [filter?.date, isClient, pageSize]
  );

  const { data, error, size, setSize, isValidating, mutate } = useSWRInfinite<
    BlogPageResponse,
    Error
  >(getKey, fetcher, {
    revalidateFirstPage: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 2000,
  });

  const blogs = data
    ? data.flatMap(page => page?.blogs || [])
    : initialData || [];
  const isLoading = !data && !error && isClient;
  const isLoadingMore =
    isValidating && !!data && typeof data[size - 1] !== 'undefined';
  const isEmpty =
    data?.[0]?.blogs?.length === 0 || (initialData?.length === 0 && !data);
  const isReachingEnd = isEmpty || (!!data && !data[data.length - 1]?.hasMore);

  const loadMore = React.useCallback(() => {
    if (!isReachingEnd && !isLoadingMore && isClient) {
      void setSize(size + 1);
    }
  }, [isClient, isLoadingMore, isReachingEnd, setSize, size]);

  React.useEffect(() => {
    if (!autoload || !isClient) {
      return;
    }

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 1000;

      if (scrolledToBottom && !isLoadingMore && !isReachingEnd) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [autoload, isClient, isLoadingMore, isReachingEnd, loadMore]);

  const renderBlogs = () => {
    if (isLoading) {
      return (
        <Col md='12' className='text-center'>
          <div>Loading blogs...</div>
        </Col>
      );
    }

    if (isEmpty) {
      return (
        <Col md='12' className='text-center'>
          <div>No blogs found.</div>
        </Col>
      );
    }

    return blogs.map(blog => {
      if (!filter?.view?.list) {
        return (
          <Col key={blog.slug} md='4' className='mb-4'>
            <CardItem
              author={blog.author}
              title={blog.title}
              subtitle={blog.subtitle}
              coverImage={blog.coverImage}
              date={blog.date}
              link={{ href: '/blogs/[slug]', as: `/blogs/${blog.slug}` }}
            />
          </Col>
        );
      }

      return (
        <Col key={`${blog.slug}-list`} md='12' className='mb-3'>
          <CardListItem
            author={blog.author}
            title={blog.title}
            subtitle={blog.subtitle}
            date={blog.date}
            link={{ href: '/blogs/[slug]', as: `/blogs/${blog.slug}` }}
          />
        </Col>
      );
    });
  };

  return {
    blogs,
    renderBlogs,
    loadMore,
    isLoading,
    isLoadingMore,
    isReachingEnd,
    isEmpty,
    error: error ?? undefined,
    mutate: () => mutate(),
  };
};
