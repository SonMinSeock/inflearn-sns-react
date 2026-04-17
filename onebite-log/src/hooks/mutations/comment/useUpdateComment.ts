import { updateComment } from "@/api/comment";
import { QUERY_KEYS } from "@/lib/constants";
import type { Comment, UseMutationCallbacks } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * useUpdateComment, 댓글 수정 mutation 커스텀 훅
 *
 * [기능]
 * - 댓글 수정 API(updateComment)를 호출하는 mutation 훅
 * - 댓글 내용 수정 요청을 서버에 전송
 *
 * [동작 방식]
 * - TanStack Query의 useMutation을 사용하여 비동기 요청 처리
 * - mutationFn으로 updateComment 함수 실행
 *   → { id, content }를 전달받아 특정 댓글 수정
 * - 요청 성공/실패 시 외부에서 전달받은 콜백 함수 실행
 *
 * [콜백 처리]
 * - onSuccess:
 *   → 댓글 수정 성공 시 실행
 *   → callbacks?.onSuccess가 존재하면 함께 실행 (UI 처리 위임)
 *
 * - onError:
 *   → 댓글 수정 실패 시 실행
 *   → error 객체를 callbacks?.onError로 전달
 *
 * [특징]
 * - 컴포넌트에서 API 로직을 분리하여 재사용성 향상
 * - 성공/실패 후 동작을 외부에서 주입 가능 (유연한 구조)
 * - toast, 모달 닫기, 입력 초기화 등의 UI 로직을 훅 외부에서 처리 가능
 */

export function useUpdateComment(callbacks?: UseMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (updatedComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comment.post(updatedComment.post_id),
        (comments) => {
          if (!comments)
            throw new Error("댓글이 캐시 데이터에 보관되어 있지 않습니다.");

          return comments.map((comment) => {
            if (comment.id === updatedComment.id)
              return { ...comment, ...updatedComment };
            return comment;
          });
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
