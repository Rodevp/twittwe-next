import prisma from '@/libs/prisma'

export default async function handler(req, res) {

    if (req.method !== 'GET') {
      return res.status(405).end()
    }
  
    try {
      const { userId } = req.query
  
      if (!userId || typeof userId !== 'string') {
        throw new Error('Invalid ID')
      }
  
      const notifications = await prisma.notification.findMany({
        where: {
          userId,
        }
      })
  
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          hasNotification: false,
        }
      })
  
      return res.status(200).json(notifications)
    } catch (error) {
      console.log(error)
      return res.status(400).end()
    }
  }