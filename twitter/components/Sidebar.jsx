import { BsHouseFill, BsBellFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"

import IconSidebar from "@/components/IconSidebar"
import SidebarIconItem from "./SidebarIconItem"
import TweetButton from "./TweetButton"

function Sidebar() {

    const items = [
        {
            label: "home",
            path: "/",
            Icon: BsHouseFill
        },
        {
            label: "Notifications",
            path: "/notifications",
            Icon: BsBellFill
        },
        {
            label: "Profile",
            path: "/users/123",
            Icon: FaUser
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
                        items.map((item) => {
                            return <SidebarIconItem key={item.path} {...item} />
                        })
                    }
                    <SidebarIconItem Icon={BiLogOut} label="logout" />
                    <TweetButton />
                </div>
            </div>
        </section>
    )
}

export default Sidebar