
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth/next'
import { nextAuthOptions } from '@/pages/api/auth/[...nextauth]';

export default async (req, res) => {

  const session = await getServerSession(req, res, nextAuthOptions)

  if (!session?.user?.email) {
    throw new Error('Not signed in')
  } 

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    }
  });

  if (!currentUser) {
    throw new Error('Not signed in');
  }

  return { currentUser };
};
