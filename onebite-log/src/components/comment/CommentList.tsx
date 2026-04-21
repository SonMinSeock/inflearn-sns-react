import CommentItem from "@/components/comment/CommentItem";
import { useCommentsData } from "@/hooks/queries/useCommentsData";
import Fallback from "@/components/Fallback";
import Loader from "@/components/Loader";
import type { Comment, NestedComment } from "@/types";

/**
 * toNestedComments, 댓글 배열을 "루트 + 자식" 구조로 변환하는 함수
 *
 * [기능]
 * - 평탄한 댓글 배열(Comment[])을 UI에서 사용하기 위한 구조로 변환
 * - root_comment_id를 기준으로 댓글을 그룹핑
 *
 * [동작 방식]
 * 1. root_comment_id가 없는 댓글 (최상위 댓글)
 *    → result 배열에 그대로 추가 (루트 댓글)
 *
 * 2. root_comment_id가 있는 댓글 (대댓글)
 *    → 해당 root 댓글을 찾아 children 배열에 추가
 *
 * 3. parent_comment_id를 이용하여
 *    → parentComment (멘션 대상) 정보를 함께 설정
 *
 * [중요 포인트]
 * - 이 함수는 "트리 구조"를 만드는 것이 아님
 * - 모든 대댓글은 "루트 댓글의 children"으로 들어감
 *
 *   예시:
 *   A (root)
 *    ├ B (parent: A)
 *    ├ C (parent: B)
 *
 *   → 실제 구조:
 *   A
 *    ├ B
 *    ├ C   (B 밑이 아니라 A 밑으로 들어감)
 *
 * [데이터 역할 구분]
 * - root_comment_id:
 *   → 어떤 루트 댓글 그룹에 속하는지 판단 (구조용)
 *
 * - parent_comment_id:
 *   → 실제 부모 댓글 (멘션 표시용)
 *
 * - parentComment:
 *   → UI에서 "@닉네임" 표시를 위해 사용
 *
 * [예외 처리]
 * - root 댓글을 찾지 못하면 무시
 * - parent 댓글을 찾지 못하면 무시
 *
 * [사용 목적]
 * - 복잡한 트리 구조 대신 단순한 2-depth 구조로 렌더링
 * - UI 단순화 및 성능 최적화
 */

function toNestedComments(comments: Comment[]): NestedComment[] {
  const result: NestedComment[] = [];

  comments.forEach((comment) => {
    if (!comment.root_comment_id) {
      result.push({ ...comment, children: [] });
    } else {
      const rootCommentIdx = result.findIndex(
        (item) => item.id === comment.root_comment_id,
      );

      const parentComment = comments.find(
        (item) => item.id === comment.parent_comment_id,
      );

      if (rootCommentIdx === -1) return;

      if (!parentComment) return;

      result[rootCommentIdx].children.push({
        ...comment,
        parentComment,
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
