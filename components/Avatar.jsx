import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useUser from "@/hooks/useUser";

const Avatar = ({ userId, isLarge, hasBorder }) => {

    const router = useRouter()

    const { data } = useUser(userId);

    const onClick = useCallback((event) => {

        event?.stopPropagation()

        const url = `/users/${userId}`

        router.push(url)

    }, [router, userId])

    return (
        <div
            className={`
                    ${hasBorder ? 'border-4 border-black' : ''}
                    ${isLarge ? 'h-32' : 'h-12'}
                    ${isLarge ? 'w-32' : 'w-12'}
                    rounded-full 
                    hover:opacity-90 
                    transition 
                    cursor-pointer
                    relative
                `}
        >
            <Image
                fill
                style={{
                    objectFit: 'cover',
                    borderRadius: '100%'
                }}
                alt="Avatar"
                onClick={onClick}
                src={ data?.profileImage || '/images/placeholder.png'}
            />
        </div>
    );
}

export default Avatar;