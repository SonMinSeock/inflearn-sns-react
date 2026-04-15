import { deleteComment } from "@/api/comment";
import type { UseMutationCallbacks } from "@/types";
import { useMutation } from "@tanstack/react-query";

/**
 * useDeleteComment, 댓글 삭제 mutation 커스텀 훅
 *
 * [기능]
 * - 댓글 삭제 API(deleteComment)를 호출하는 mutation 훅
 * - 특정 댓글(id)을 서버에서 삭제 요청
 *
 * [동작 방식]
 * - TanStack Query의 useMutation을 사용하여 비동기 요청 처리
 * - mutationFn으로 deleteComment 함수 실행
 *   → id를 전달받아 해당 댓글 삭제
 * - 요청 성공/실패 시 외부에서 전달받은 콜백 함수 실행
 *
 * [콜백 처리]
 * - onSuccess:
 *   → 댓글 삭제 성공 시 실행
 *   → callbacks?.onSuccess가 존재하면 함께 실행 (UI 처리 위임)
 *
 * - onError:
 *   → 댓글 삭제 실패 시 실행
 *   → error 객체를 callbacks?.onError로 전달
 *
 * [특징]
 * - 컴포넌트에서 API 로직을 분리하여 재사용성 향상
 * - 성공/실패 후 동작을 외부에서 주입 가능 (유연한 구조)
 * - 삭제 후 UI 처리(목록 갱신, 토스트, 모달 닫기 등)를 훅 외부에서 제어 가능
 */

export function useDeleteComment(callbacks?: UseMutationCallbacks) {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
