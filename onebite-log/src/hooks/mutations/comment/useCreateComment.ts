import { createComment } from "@/api/comment";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { Comment, UseMutationCallbacks } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * tanstack query mutation 댓글 생성 요청 커스텀 훅
 */
export function useCreateComment(callbacks?: UseMutationCallbacks) {
  const queryClient = useQueryClient();
  const session = useSession();
  const { data: profile, error } = useProfileData(session?.user.id);

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.setQueryData<Comment[]>(
        QUERY_KEYS.comment.post(newComment.post_id),
        (comments) => {
          if (!comments)
            throw new Error("댓글이 캐시 데이터에 보관되어 있지 않습니다.");

          if (!profile)
            throw new Error("사용자의 프로필 정보를 찾을수 없습니다.");
          return [{ ...newComment, author: profile }, ...comments];
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
