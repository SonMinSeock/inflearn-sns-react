import { create } from "zustand";

// 스토어 타입 정의
type Store = {
  count: number;
  actions: {
    increase: () => void;
    decrease: () => void;
  };
};

// 스토어 생성
// create 메서드는 state, action 함수를 포함하는 객체인 store를 생성한다.
export const useCountStore = create<Store>((set, get) => ({
  count: 0, // state
  actions: {
    increase: () => {
      // const count = get().count; // 현재 스토어의 count state 불러오기
      // set({ count: count + 1 }); // 현재 스토어 업데이트, 명시되어 있는 프로퍼티 있으면 그 프로퍼티가 업데이트한다.

      // 함수형 업데이트
      // 함수형 업데이트로 많이 사용함
      set((store) => ({
        count: store.count + 1,
      }));
    }, // action
    decrease: () => {
      // 함수형 업데이트
      set((store) => ({
        count: store.count - 1,
      }));
    }, // action
  },
}));

/**
 * 커스텀 훅들
 */

/**
 * useCount 훅
 * count 스토어의 count 상태를 select해서 반환
 */
export const useCount = () => {
  const count = useCountStore((store) => store.count);
  return count;
};

/**
 * useIncreaseCount 훅
 * count 스토어의 actions의 increase select해서 반환
 */
export const useIncreaseCount = () => {
  const increase = useCountStore((store) => store.actions.increase);
  return increase;
};

/**
 * useDecreaseCount 훅
 * count 스토어의 actions의 decrease select해서 반환
 */
export const useDecreaseCount = () => {
  const decrease = useCountStore((store) => store.actions.decrease);
  return decrease;
};
