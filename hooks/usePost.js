import useSWR from 'swr';

import fetcher from '@/hooks/useFetcher';

const usePost = (postId) => {
  const { data, error, isLoading, mutate } = useSWR(postId ? `/api/posts/${postId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePost;