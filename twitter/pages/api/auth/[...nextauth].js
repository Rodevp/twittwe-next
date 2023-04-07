import bcrypt from "bcrypt"
import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import primaClient from "@/libs/prisma"

export default NextAuth({
    adapter: PrismaAdapter(primaClient),
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {  label: "email", type: "text" },
                password: { label: "password", type: "password"}
            },
            async login(credentials) {

                if ( !credentials?.email || !credentials?.password ) {
                    throw new Error('Email or Password is invalid')       
                }

                const user = await primaClient.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if (!user ||  !user.hashedPassword) {
                    throw new Error('Email or Password is invalid')
                }

                const correctPassword = bcrypt.compare(
                    credentials?.password, user.hashedPassword
                )

                if (!correctPassword) {
                    throw new Error('Email or Password is invalid')
                }

                return user
            }
        }),
        
    ],
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    jwt: {
        secret: process.env.NEXTAUTH_SSHH
    },
    secret: process.env.NEXTAUTH_SSHH_X2
})