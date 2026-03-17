import { createProfile, fetchProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useSession } from "@/store/session";
import type { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

/**
 * tanstack query useQuery 프로필 요청 커스텀 훅
 */
export function useProfileData(userId?: string) {
  const session = useSession();

  const isMine = session?.user.id === userId;

  return useQuery({
    queryKey: QUERY_KEYS.profile.byId(userId!),
    queryFn: async () => {
      try {
        const profile = await fetchProfile(userId!);
        return profile;
      } catch (error) {
        // PGRST116 에러 코드가 프로필 없어서 발생한 에러이다. 그리고
        if (isMine && (error as PostgrestError).code === "PGRST116") {
          // 프로필 생성 요청
          return await createProfile(userId!);
        }
        // 위 에러가 아니면 예외를 던진다.
        throw error;
      }
    },
    enabled: !!userId, // userId 없으면 쿼리 요청 못하도록 한다.
  });
}
