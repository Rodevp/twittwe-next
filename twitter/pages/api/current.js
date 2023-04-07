import serverAuth from '@/libs/server';

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    return res.status(200).json({ message: 'user', currentUser });
  
  } catch (error) {
    
    console.log(error);
    return res.status(400).end();

  }
}