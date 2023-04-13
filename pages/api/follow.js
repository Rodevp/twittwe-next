import prisma from '@/libs/prisma'
import serverAuth from "@/libs/server"

export default async function handler(req, res) {

  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end()
  }

  try {
    const { userId } = req.body

    const currenId = userId === undefined ? req.query.id : userId

    const { currentUser } = await serverAuth(req, res)

    if (!currenId || typeof currenId !== 'string') {
      throw new Error('Invalid ID')
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currenId
      }
    })

    if (!user) {
      throw new Error('Invalid ID')
    }

    let updatedFollowingIds = [...( user.followingsId || [] ) ]

    if (req.method === 'POST') {
      updatedFollowingIds.push(userId)

      // NOTIFICATION PART START
      try {
        await prisma.notification.create({
          data: {
            body: 'Someone followed you!',
            userId,
          },
        })

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          }
        })
      } catch (error) {
        console.log(error)
      }
      // NOTIFICATION PART END
      
    }

    if (req.method === 'DELETE') {
      updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId)
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingsId: updatedFollowingIds
      }
    })

    return res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}