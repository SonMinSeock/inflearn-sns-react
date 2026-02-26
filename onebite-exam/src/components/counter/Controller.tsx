import {
  useCountStore,
  useDecreaseCount,
  useIncreaseCount,
} from "@/store/count";
import { Button } from "../ui/button";

export default function Controller() {
  /**
   * Zustand가 컴포넌트에서 불러온 store 값들 중에 하나라도 업데이트가 되면 자동으로 리렌더링 발생한다.
   * selector를 통해 불러올 부분을 선택해서 가져올수 있다.
   */

  //   const increase = useCountStore((store) => store.increase);
  //   const decrease = useCountStore((store) => store.decrease);

  // const { increase, decrease } = useCountStore((store) => store.actions);

  const increase = useIncreaseCount();
  const decrease = useDecreaseCount();

  return (
    <div>
      <Button onClick={decrease}>-</Button>
      <Button onClick={increase}>+</Button>
    </div>
  );
}
