import serverAuth from '@/libs/server'
import prisma from  "@/libs/prisma"

export default async function handler(req, res) {
    if (req.method !== 'PATCH') {
        return res.status(405).end();
      }

      const { currentUser } = await serverAuth(req, res);

      const { name, username, bio, profileImage, coverImage } = req.body;

      try {
        if (!name || !username) {
            throw new Error('Missing fields');
          }
      
          const updatedUser = await prisma.user.update({
            where: {
              id: currentUser.id,
            },
            data: {
              name,
              username,
              bio,
              profileImage,
              coverImage
            }
          });
          return res.status(200).json(updatedUser);
      } catch (error) {
        console.log(error);
        return res.status(400).end();
      }

      

}