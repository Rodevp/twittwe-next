import useSWR from 'swr';

import fetcher from '@/hooks/useFetcher';

const usePosts = (userId) => {

  const url = userId ? `/api/posts?id=${userId}` : '/api/posts';
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePosts;