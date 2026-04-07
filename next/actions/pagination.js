import React from 'react';
import useSWRInfinite from 'swr/infinite';
import CardItem from '../components/CardItem';
import CardListItem from '../components/CardListItem';
import { Col } from 'react-bootstrap';

// Client-side fetcher function
const fetcher = async (url) => {
  try {
    const res = await fetch(url);
  
    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const useGetBlogsPages = ({ initialData, filter, pageSize = 6, autoload = false }) => {
  // More reliable hydration detection
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use mounted state and window check
  const isClient = mounted && typeof window !== 'undefined';

  const getKey = React.useCallback((pageIndex, previousPageData) => {
    // Don't fetch on server side or before hydration
    if (!isClient) {
      return null;
    }
    // If we've reached the end, return null to stop fetching
    if (previousPageData && !previousPageData.hasMore) {
      return null;
    }
    
    // Extract the sort direction from the filter object
    // Handle both object format { asc: boolean } and string format
    let sortDirection = 'desc'; // default
    
    if (filter?.date) {
      if (typeof filter.date === 'object' && filter.date.hasOwnProperty('asc')) {
        sortDirection = filter.date.asc ? 'asc' : 'desc';
      } else if (typeof filter.date === 'string') {
        sortDirection = filter.date;
      }
    }
    
    // Return the API endpoint with pagination parameters
    const url = `/api/blogs?page=${pageIndex}&limit=${pageSize}&date=${sortDirection}`;
    return url;
  }, [isClient, mounted, pageSize, filter?.date]);

  const {
    data,
    error,
    size,
    setSize,
    isValidating,
    mutate
  } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 2000,
  });

  // Use initial data if SWR data is not available yet
  const blogs = data ? data.flatMap(page => page?.blogs || []) : (initialData || []);
  const isLoading = !data && !error && isClient;
  const isLoadingMore = isValidating && data && typeof data[size - 1] !== 'undefined';
  const isEmpty = data?.[0]?.blogs?.length === 0 || (initialData?.length === 0 && !data);
  const isReachingEnd = isEmpty || (data && !data[data.length - 1]?.hasMore);

  // Function to load more pages
  const loadMore = React.useCallback(() => {
    if (!isReachingEnd && !isLoadingMore && isClient) {
      setSize(size + 1);
    }
  }, [isReachingEnd, isLoadingMore, size, setSize, isClient]);

  // Infinite scroll effect
  React.useEffect(() => {
    if (autoload && isClient) {
      
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
    }
  }, [autoload, isClient, loadMore, isLoadingMore, isReachingEnd]);

  // Render function to convert blogs to JSX elements
  const renderBlogs = () => {
    if (isLoading) {
      return (
        <Col md="12" className="text-center">
          <div>Loading blogs...</div>
        </Col>
      );
    }

    if (isEmpty) {
      return (
        <Col md="12" className="text-center">
          <div>No blogs found.</div>
        </Col>
      );
    }

    return blogs.map(blog => {
      if (!filter?.view?.list) {
        return (
          <Col key={blog.slug} md='4' className="mb-4">
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
      } else {
        return (
          <Col key={`${blog.slug}-list`} md='12' className="mb-3">
            <CardListItem
              author={blog.author}
              title={blog.title}
              subtitle={blog.subtitle}
              date={blog.date}
              link={{ href: '/blogs/[slug]', as: `/blogs/${blog.slug}` }}
            />
          </Col>
        );
      }
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
    error,
    mutate
  };
};
