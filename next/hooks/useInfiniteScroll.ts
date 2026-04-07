import { useEffect } from 'react';

export const useInfiniteScroll = (
  loadMore: () => void,
  isLoadingMore: boolean,
  isReachingEnd: boolean
) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 1000 &&
        !isLoadingMore &&
        !isReachingEnd
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, isLoadingMore, isReachingEnd]);
};
