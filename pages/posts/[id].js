import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners"

import usePost from "@/hooks/usePost"

import Header from "@/components/Header"
import Form from "@/components/Form"
import PostItem from "@/post/PostItem"
import CommentFeed from "@/comments/CommentFeed"

function PostView () {

  const router = useRouter()
  const { id } = router.query

  const { data: fetchedPost, isLoading } = usePost(id)

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    )
  }

  return ( 
    <>
      <Header showBackArrow label="Tweet" />
      <PostItem data={fetchedPost} />
      <Form postId={id} isComment placeholder="Tweet your reply" />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
   );
}
 
export default PostView;