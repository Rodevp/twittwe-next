import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai'
import { formatDistanceToNowStrict } from 'date-fns'

import { useModalLogin } from '@/hooks/useModalLogin'
import useCurrentUser from '@/hooks/useCurrentUser'
import useLike from '@/hooks/useLike'

import Avatar from '@/components/Avatar'


function PostItem ({ data = {}, userId }) {

  const router = useRouter()
  const loginModal = useModalLogin()

  const { data: currentUser } = useCurrentUser()
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId})

  const goToUser = useCallback((ev) => {
    ev.stopPropagation()
    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id])

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`)
  }, [router, data.id])

  const onLike = useCallback(async (ev) => {
    ev.stopPropagation()

    if (!currentUser) {
      return loginModal.onOpen()
    }

    toggleLike()
  }, [loginModal, currentUser, toggleLike])

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null
    }

    return formatDistanceToNowStrict(new Date(data.createdAt))
    
  }, [data.createdAt])

  return (
    <div 
      onClick={goToPost}
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      ">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p 
              onClick={goToUser} 
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
                px-4
            ">
              {data.user.name}
            </p>
            <span 
              onClick={goToUser} 
              className="
                text-white
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
              @{data.user.username}
            </span>
            <span className="text-white text-sm px-1">
              {createdAt}
            </span>
          </div>
          <div className="text-white mt-1 px-4">
            {data.body}
          </div>
          <div className="flex flex-row self-start px-4 mt-3 gap-10">
            <div 
              className="
                flex 
                flex-row 
                items-center 
                text-white 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
              "
            >
              <AiOutlineMessage size={20} />
              <p>
                {data.comments?.length || 0}
              </p>
            </div>
            <div
              onClick={onLike}
              className="
                flex 
                flex-row
                items-center 
                gap-2 
                cursor-pointer 
                transition 
              "
            >
              <LikeIcon color={hasLiked ? 'red' : 'white'} size={20} />
              <p
                className='text-white'
              >
                {data?.likedIds.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem