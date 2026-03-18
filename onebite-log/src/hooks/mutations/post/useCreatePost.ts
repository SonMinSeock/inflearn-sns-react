import { createPost } from "@/api/post";
import type { UseMutationCallbacks } from "@/types";
import { useMutation } from "@tanstack/react-query";

/**
 * tanstack query mutation 포스트 생성 요청 커스텀 훅
 */
export function useCreatePost(callbacks?: UseMutationCallbacks) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
