import { BsHouseFill, BsBellFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"

import IconSidebar from "@/components/IconSidebar"
import SidebarIconItem from "@/components/SidebarIconItem"
import TweetButton from "@/components/TweetButton"
import useCurrentUser from "@/hooks/useCurrentUser"

import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useModalLogin } from "@/hooks/useModalLogin"

function Sidebar() {

    const { data } = useCurrentUser()
    const modaLogin = useModalLogin()

    const router = useRouter()

    const items = [
        {
            label: "home",
            path: "/",
            Icon: BsHouseFill
        },
        {
            Icon: BsBellFill,
            label: 'Notifications',
            path: '/notifications',
            alert: data?.user?.hasNotification
        },
        {
            Icon: FaUser,
            label: 'Profile',
            path: `/users/${data?.user?.id}`,
        }
    ]

    return (
        <section
            className="col-span-1 h-full pr-4 md:pr-6"
        >
            <div
                className="flex flex-col items-end"
            >
                <div
                    className=" space-y-2 lg:w-[230px]"
                >
                    <IconSidebar />
                    {
                        items.map((item, i) => {
                            return <SidebarIconItem onClick={() => {

                                if (!data?.user && item.path !== "/") {
                                    modaLogin.onOpen()
                                } else {
                                    router.push(item.path)
                                }
                            }} key={i} {...item} />
                        })
                    }
                    {
                        data?.user && (
                            <SidebarIconItem onClick={() => signOut()} Icon={BiLogOut} label="logout" />
                        )
                    }
                    <TweetButton />
                </div>
            </div>
        </section>
    )
}

export default Sidebar