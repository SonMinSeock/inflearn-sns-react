/**
 * tanstack query mutation 소셜 로그인 요청 커스텀 훅
 */

import { signInWithOAuth } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithOAuth() {
  return useMutation({
    mutationFn: signInWithOAuth,
  });
}
