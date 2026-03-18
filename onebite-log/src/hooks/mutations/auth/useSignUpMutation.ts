/**
 * tanstack query mutation 회원가입 요청 커스텀 훅
 */

import { signUp } from "@/api/auth";
import type { UseMutationCallbacks } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignUp(callbacks?: UseMutationCallbacks) {
  return useMutation({
    mutationFn: signUp,
    onError: (error) => {
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    },
  });
}
