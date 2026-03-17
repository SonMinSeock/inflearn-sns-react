import GlobalLoader from "@/components/global-loader";
import { useProfileData } from "@/hooks/queries/useProfileData";
import supabase from "@/lib/supabase";
import { useIsSessionLoaded, useSession, useSetSession } from "@/store/session";
import { useEffect, type ReactNode } from "react";

export default function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();
  const setSession = useSetSession();
  const isSessionLoaded = useIsSessionLoaded();
  const { data: profile, isLoading: isProfileLoading } = useProfileData(
    session?.user.id,
  );

  useEffect(() => {
    // supabase 클라이언트의 auth 상태 변경되면 실행하는 이벤트 핸들러이다.
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, []);

  if (!isSessionLoaded) return <GlobalLoader />;

  if (isProfileLoading) return <GlobalLoader />;

  return children;
}
