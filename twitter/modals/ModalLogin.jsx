import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useModalLogin } from "@/hooks/useModalLogin";
import { useModalRegister } from "@/hooks/useModalRegister";
import { useState } from "react"
import { signIn } from "next-auth/react"



function ModalLogin() {

    const loginModal = useModalLogin()
    const registerModal = useModalRegister()


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async () => {
        setIsLoading(true)
        try {
            
            signIn("credentials", {
                email,
                password,
            })

            loginModal.onClose()
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const onToggle = () => {
        if (isLoading) {
            return
          }
        
          registerModal.onOpen()
          loginModal.onClose()
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
          <p className="text-white">First time using Twitter?
            <span 
              onClick={onToggle} 
              className="
                text-white 
                cursor-pointer 
                hover:underline
              "
              > Create an account</span>
          </p>
        </div>
      )

    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Sign in"
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default ModalLogin