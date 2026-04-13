import { createComment } from "@/api/comment";
import type { UseMutationCallbacks } from "@/types";
import { useMutation } from "@tanstack/react-query";

/**
 * tanstack query mutation 댓글 생성 요청 커스텀 훅
 */
export function useCreateComment(callbacks?: UseMutationCallbacks) {
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
