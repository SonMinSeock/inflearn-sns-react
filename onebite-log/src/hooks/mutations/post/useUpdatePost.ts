import { updatePost } from "@/api/post";
import type { UseMutationCallbacks } from "@/types";
import { useMutation } from "@tanstack/react-query";

/**
 * tanstack query mutation 포스트 수정요청 커스텀 훅
 */

export function useUpdatePost(callbacks?: UseMutationCallbacks) {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
