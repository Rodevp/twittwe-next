
import prisma from '@/libs/prisma';
import { getServerSession } from 'next-auth';

const serverAuth = async (req) => {

  const session = await getServerSession({ req });

  if (!session?.user?.email) {
    throw new Error('Not signed in');
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

export default serverAuth;