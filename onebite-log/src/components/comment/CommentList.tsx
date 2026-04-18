import CommentItem from "@/components/comment/CommentItem";
import { useCommentsData } from "@/hooks/queries/useCommentsData";
import Fallback from "@/components/Fallback";
import Loader from "@/components/Loader";
import type { Comment, NestedComment } from "@/types";

/**
 * 중첩된 Comment로 변환 해주는 함수
 */

function toNestedComments(comments: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];

  comments.forEach((comment) => {
    if (!comment.parent_comment_id) {
      result.push({ ...comment, children: [] });
    } else {
      const parentCommentIdx = result.findIndex(
        (item) => item.id === comment.parent_comment_id,
      );

      result[parentCommentIdx].children.push({
        ...comment,
        parentComment: result[parentCommentIdx],
        children: [],
      });
    }
  });

  return result;
}

export default function CommentList({ postId }: { postId: number }) {
  const {
    data: comments,
    error: fetchCommentsError,
    isPending: isFetchCommentsPending,
  } = useCommentsData(postId);

  if (fetchCommentsError) return <Fallback />;

  if (isFetchCommentsPending) return <Loader />;

  const nestedComments = toNestedComments(comments);

  return (
    <div className="flex flex-col gap-5">
      {nestedComments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
}
