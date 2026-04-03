import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { UseMutationCallbacks } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * tanstack query mutation 포스트 삭제 요청 커스텀 훅
 */

export function useDeletePost(callbacks?: UseMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletePost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 스토리지에 있는 이미지 삭제하는 기능 수행
      if (deletePost.img_urls && deletePost.img_urls.length > 0) {
        await deleteImagesInPath(`${deletePost.author_id}/${deletePost.id}`);
      }

      queryClient.resetQueries({
        queryKey: QUERY_KEYS.post.list,
      });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
