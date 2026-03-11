import { signInWithPassword } from "@/api/auth";
import type { UseMutationCallbacks } from "@/types";
import { useMutation } from "@tanstack/react-query";

/**
 * tanstack query mutation 로그인 요청 커스텀 훅
 */

export function useSignInWithPassword(callbacks?: UseMutationCallbacks) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      console.error(error);

      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}
