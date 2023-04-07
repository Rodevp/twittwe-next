import bcrypt from "bcrypt"
import prisma from "@/libs/prisma"

export default async function handler(req, res) {
    
    if (req.method !== "POST") {
        return res.status(405).json({
            message: 'Method not allowed'
        })
    }

    const { email, username, name, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 12)

    try {
        const user = prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword
            }
        })
        return res.status(201).json({ message: 'created', user })
    } catch (error) {
        console.log(error)
    }

}