import { signInWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

/**
 * tanstack query mutation 로그인 요청 커스텀 훅
 */

export function useSignInWithPassword() {
  return useMutation({
    mutationFn: signInWithPassword,
  });
}
