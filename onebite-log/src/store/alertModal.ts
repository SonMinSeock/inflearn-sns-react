/**
 * 경고 모달 상태 스토어
 */
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

// 열린 상태 타입 정의
type OpenState = {
  isOpen: true;
  title: string;
  description: string;
  onPositive?: () => void; // 확인 버튼 클릭시 동작할 함수
  onNegative?: () => void; // 취소 버튼 클릭시 동작할 함수
};

// 닫은 상태 타입 정의
type CloseState = {
  isOpen: false;
};

type State = OpenState | CloseState;

const initialState = {
  isOpen: false,
} as State;

const useAlertModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (params: Omit<OpenState, "isOpen">) => {
          set({ ...params, isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    {
      name: "AlertModalStore",
    },
  ),
);

/**
 * 커스텀 훅 정의
 */
export const useOpenAlertModal = () => {
  const open = useAlertModalStore((state) => state.actions.open);
  return open;
};

export const useAlertModal = () => {
  const store = useAlertModalStore();
  return store as typeof store & State;
};
