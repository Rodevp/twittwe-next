import CommentItem from '@/comments/CommentItem'

function CommentFeed({ comments = [] }) {
  return (
    <>
      {comments.map((comment ) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;