import { create } from "zustand";
import { devtools, combine } from "zustand/middleware";

const initialState = {
  isOpen: false,
};

/**
 * 프로필 수정 모말 스토어
 */
const useProfileEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
      },
    })),
    { name: "profileEditorModalStore" },
  ),
);

/**
 * useOpenProfileEditorModal
 * open 액션 함수를 반환 하는 커스텀 훅
 */

export const useOpenProfileEditorModal = () => {
  const open = useProfileEditorModalStore((store) => store.actions.open);
  return open;
};

/**
 * useProfileEditorModal
 * store 반환 하는 커스텀 훅
 */

export const useProfileEditorModal = () => {
  const store = useProfileEditorModalStore();
  return store;
};
