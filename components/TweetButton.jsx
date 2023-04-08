import { FaFeather } from "react-icons/fa"
import { useModalLogin } from "@/hooks/useModalLogin"


function TweetButton() {

    const loginModal = useModalLogin()

    const onClick = () => {
        loginModal.onOpen()
    }

    return (
        <div
            onClick={onClick}
        >
            <div
                className="
                    mt-6 lg:hidden rouded-full h-14 w-14 p-4
                    flex justify-center items-center bg-sky-500 
                    hover:bg-opacity-80 transition cursor-pointer rounded-full
                "
            >
                <FaFeather size={24} color="white" />
            </div>
            <div
                className="
                    mt-6 hidden lg:block px-4 py-2 bg-sky-500
                    hover:bg-opacity-90 cursor-pointer transition rounded-full
                "
            >
                <p
                    className="
                        hidden lg:block text-center font-semibold text-white
                        tex-[20px] 
                    "
                >
                    Tweet
                </p>
            </div>
        </div>
    )
}

export default TweetButton