import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import PostItem from '@/post/PostItem';


function PostFeed ({ userId }) {

  console.log('user id -> ', userId)

  const { data: currentUser } = useCurrentUser()

  const idSearchPost = userId !== undefined ? userId : currentUser?.user.id

  const { data } = usePosts(idSearchPost)

  return (
    <>
      {
        data?.map((postData) => {

          return (
            <PostItem data={postData} userId={postData?.userId} key={postData?.id}  />
          )

        })
      }
    </>
  );
};

export default PostFeed