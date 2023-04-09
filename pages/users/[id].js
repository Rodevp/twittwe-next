import Header from "@/components/Header"
import useUser from "@/hooks/useUser"
import UserBio from "@/users/UserBio"
import UserHero from "@/users/UserHero"
import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners"

function User() {

    const router = useRouter()
    const { id } = router.query

    const { data, isLoading } = useUser(id)

    if ( !data || isLoading) {
        return (
            <div
                className="
                    flex justify-center item-center
                    h-full
                "
            >
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    }

  return (
    <>
        <Header label={data?.username} showBackArrow />
        <UserHero userId={id} />
        <UserBio  userId={id} />
    </>
  )
}

export default User