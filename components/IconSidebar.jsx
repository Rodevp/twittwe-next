import { useRouter } from "next/router"
import { BsTwitter } from "react-icons/bs"

function IconSidebar() {

    const router = useRouter()

  return (
    <div
        onClick={() => router.push('/')}
        className="
         rounde-full h-14 w-14 flex items-center
         justify-center hover:bg-blue-300
         hover:bg-opacity-10 cursor-pointer transition
        "
    >
        <BsTwitter  size={25} color="white" />
    </div>
  )
}

export default IconSidebar