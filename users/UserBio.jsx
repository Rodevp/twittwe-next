import { useMemo } from "react"
import { BiCalendar } from "react-icons/bi"
import { format } from "date-fns"

import useCurrentUser from "@/hooks/useCurrentUser"
import useUser from "@/hooks/useUser"
import useFollow from "@/hooks/useFollow"
import useEditModal from "@/hooks/useEditModal"

import Button from "@/components/Button"


function UserBio ({ userId }) {
    
  const { data: currentUser } = useCurrentUser()
  const { data: dataUser } = useUser(userId)

  const editModal = useEditModal()

  const { isFollowing, toggleFollow } = useFollow(userId)

  console.log('follow -> ', isFollowing(), 'id user -> ', userId)

  const createdAt = useMemo(() => {
    if (!dataUser?.createAt) {
      return null
    }

    return format(new Date(dataUser.createAt), 'MMMM yyyy')
  }, [dataUser?.createAt])


  return ( 
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {userId === currentUser?.user?.id ? (
          <Button secondary label="Edit" onClick={editModal.onOpen} />
        ) : (
          <Button
            onClick={toggleFollow} 
            label={isFollowing() ? 'Unfollow' : 'Follow'}
            secondary={!isFollowing()}
            outline={isFollowing()}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {dataUser?.name}
          </p>
          <p className="text-md text-white">
            @{dataUser?.username}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">
            {dataUser?.bio}
          </p>
          <div 
            className="
              flex 
              flex-row 
              items-start 
              gap-2 
              mt-2
          ">
            <BiCalendar size={24} color="white" />
            <p className="text-white self-start">
              Joined {createdAt}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex">
            <p className="text-white">Following</p>
            <p className="text-white" style={{ marginLeft: 5 }}>{dataUser?.followingsId.length}</p>
          </div>
          <div className="flex">
            <p className="text-white" style={{ marginRight: 5 }}>{dataUser?.followersCount || 0}</p>
            <p className="text-white">Followers</p>
          </div>
        </div>
      </div>
    </div>
   )
}
 
export default UserBio