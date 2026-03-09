/**
 * tanstack query mutation 회원가입 요청 커스텀 훅
 */

import { signUp } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
