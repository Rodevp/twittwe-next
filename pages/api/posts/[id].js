
import prisma from "@/libs/prisma";

export default async function handler(req, res) {
    
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}