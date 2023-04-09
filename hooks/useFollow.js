import axios from "axios"
import { useCallback, useMemo } from "react"
import { toast } from "react-hot-toast"

import useCurrentUser from "@/hooks/useCurrentUser"
import { useModalLogin } from "@/hooks/useModalLogin"
import useUser from "@/hooks/useUser"

const useFollow = (userId) => {

    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
    const { mutate: mutateFetchedUser } = useUser(userId)

    const loginModal = useModalLogin()

    const isFollowing = useMemo(() => {

        const list = currentUser?.followingIds || []

        return list.includes(userId)
    }, [currentUser, userId])

    const toggleFollow = useCallback(async () => {
        
        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request

            if (isFollowing) {
                request = () => axios.delete('/api/follow', { data: { userId } })
            } else {
                request = () => axios.post('/api/follow', { userId })
            }

            await request()
            mutateCurrentUser()
            mutateFetchedUser()

            toast.success('Success')
        } catch (error) {
            toast.error('Something went wrong')
        }
    }, [currentUser, isFollowing, userId, mutateCurrentUser, mutateFetchedUser, loginModal])

    return {
        isFollowing,
        toggleFollow,
    }
}

export default useFollow