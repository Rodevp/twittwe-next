import useSWR from 'swr'

import fetcher from '@/hooks/useFetcher'

const useUser = (userId) => {

    const { data, error, isLoading, mutate } = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useUser;