import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import PostItem from '@/post/PostItem';


function PostFeed () {

  const { data: currentUser } = useCurrentUser()

  const { data } = usePosts(currentUser?.user.id);

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