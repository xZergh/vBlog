import useSWR from 'swr';

type HelloApiResponse = { message: string };
type BlogApiResponse<TBlog> = {
  blogs: TBlog[];
  hasMore: boolean;
  total: number;
  page: number;
  limit: number;
};

const fetcher = async <TResponse>(url: string): Promise<TResponse> => {
  const res = await fetch(url);
  return res.json() as Promise<TResponse>;
};

export const useGetHello = () => {
  return useSWR<HelloApiResponse>('/api/hello', fetcher);
};

export const useGetBlogs = <TBlog>(initialData?: BlogApiResponse<TBlog>) => {
  return useSWR<BlogApiResponse<TBlog>>('/api/blogs', fetcher, {
    fallbackData: initialData,
  });
};
