import serverAuth from '@/libs/server';

export default async function handler(req, res) {

  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    return res.status(200).json({
      message: 'user', user: {
        bio: currentUser.bio,
        coverImage: currentUser.coverImage,
        createAt: currentUser.createAt,
        email: currentUser.email,
        emailVerified: currentUser.emailVerified,
        followingsId: currentUser.followingsId,
        hasNotification: currentUser.hasNotification,
        id: currentUser.id,
        image: currentUser.image,
        name: currentUser.name,
        profileImage: currentUser.profileImage,
        updateAt: currentUser.updateAt,
        username: currentUser.username,
      }
    });

  } catch (error) {

    console.log(error.message);
    return res.status(400).end();

  }
}