import usePosts from '@/hooks/usePosts';

import PostItem from '@/post/PostItem';


function PostFeed ({ userId }) {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed