import { updatePassword } from "@/api/auth";
import type { UseMutationCallbacks } from "@/types";
import { useMutation } from "@tanstack/react-query";

/**
 * tanstack query mutation 비밀번호 요청 커스텀 훅
 */
export function useUpdatePassword(callbacks?: UseMutationCallbacks) {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
