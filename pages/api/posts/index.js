import serverAuth from "@/libs/server";
import prisma from "@/libs/prisma";

export default async function handler(req, res) {

  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;

      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id
        }
      });

      return res.status(200).json(post);
    }

    if (req.method === 'GET') {
      const { id } = req.query;

      let posts;

      if (id && typeof id === 'string') {

        posts = await prisma?.post.findMany({
          where: {
            userId: id
          },
          include: {
            user: true,
            comments: true
          }
        });
      } else {
        posts = await prisma?.post.findMany({
          include: {
            user: true,
            comments: true
          }
        });
      }

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}