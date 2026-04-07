
import { useEffect } from 'react';

export const useInfiniteScroll = (loadMore, isLoadingMore, isReachingEnd) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000 // Load when 1000px from bottom
        && !isLoadingMore 
        && !isReachingEnd
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, isLoadingMore, isReachingEnd]);
};
