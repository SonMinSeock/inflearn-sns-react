import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  isLoaded: boolean;
  session: Session | null;
};

const initialState = {
  isLoaded: false,
  session: null,
} as State;

/**
 * 세션 스토어
 */
const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setSession: (session: Session | null) => {
          set({ session, isLoaded: true });
        },
      },
    })),
    {
      name: "sessionStore",
    },
  ),
);

/**
 * 세션 스토어의 session 상태 데이터 반환 해주는 커스텀 훅
 */
export const useSession = () => {
  const session = useSessionStore((state) => state.session);
  return session;
};

/**
 * 세션 스토어의 로딩 상태 데이터 반환 해주는 커스텀 훅
 */
export const useIsSessionLoaded = () => {
  const isLoaded = useSessionStore((state) => state.isLoaded);
  return isLoaded;
};

/**
 * 세션 스토어의 상태를 변경 해주는 액션 함수 반환 해주는 커스텀 훅
 */
export const useSetSession = () => {
  const setSession = useSessionStore((state) => state.actions.setSession);
  return setSession;
};
