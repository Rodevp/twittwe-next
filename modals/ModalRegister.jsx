import Input from "@/components/Input"
import Modal from "@/components/Modal"
import { useModalLogin } from "@/hooks/useModalLogin"
import { useModalRegister } from "@/hooks/useModalRegister"
import axios from "axios"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { toast } from "react-hot-toast"


function ModalRegister() {

    const loginModal = useModalLogin()
    const registerModal = useModalRegister()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [username, setUserName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async () => {
        try {
            
            setIsLoading(true)
            
            await axios.post('/api/register', {
                email,
                password,
                username,
                name,
              })
            
            toast.success("Register correct")

            await signIn("credentials", {
                email,
                password
            })

            registerModal.onClose()
            loginModal.onClose()

        } catch (error) {
            console.log(error.message)
            toast.error("Error on register")
        } finally {
            setIsLoading(false)
        }
    }

    const onToggle = () => {
        if (isLoading) {
            return
          }
        
          registerModal.onClose()
          loginModal.onOpen()
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="UserName"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )

    const footerContent = (
        <div className="text-center mt-4">
            <p className="text-white" >Already have an account?
                <span
                    onClick={onToggle}
                    className="
                      text-white 
                        cursor-pointer 
                        hover:underline
                    "
                > Sign in</span>
            </p>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Create a account"
            actionLabel="Register"
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default ModalRegister