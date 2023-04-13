import axios from "axios"
import { useCallback, useMemo } from "react"
import { toast } from "react-hot-toast"

import useCurrentUser from "@/hooks/useCurrentUser"
import { useModalLogin } from "@/hooks/useModalLogin"
import usePost from "@/hooks/usePost"
import usePosts from "@/hooks/usePosts"

const useLike = ( { postId, userId} ) => {

  const { data: currentUser } = useCurrentUser()
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId)
  const { mutate: mutateFetchedPosts } = usePosts(userId)

  const loginModal = useModalLogin()

  const hasLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || []

    return list.includes(currentUser?.user.id)
  }, [fetchedPost, currentUser])

  const toggleLike = async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      let request

      if (hasLiked) {
        request = () => axios.delete('/api/like', { params: { id: postId } })
      } else {
        request = () => axios.post('/api/like', { postId })
      }

      await request()
      mutateFetchedPost()
      mutateFetchedPosts()

      toast.success('Success')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return {
    hasLiked,
    toggleLike,
  }
}

export default useLike