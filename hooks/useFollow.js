import axios from "axios"
import { toast } from "react-hot-toast"

import useCurrentUser from "@/hooks/useCurrentUser"
import { useModalLogin } from "@/hooks/useModalLogin"
import useUser from "@/hooks/useUser"

const useFollow = (userId) => {

    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser()
    const { mutate: mutateFetchedUser } = useUser(userId)

    const loginModal = useModalLogin()
    
    const isFollowing = () => {

        const list = currentUser?.user.followingsId || []

        return list.includes(userId)
    }

    const toggleFollow = async () => {

        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request

            if ( isFollowing() ) {
                request = () => axios.delete('/api/follow', { params: { id: userId } })
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
    }

    return {
        isFollowing,
        toggleFollow,
    }
}

export default useFollow