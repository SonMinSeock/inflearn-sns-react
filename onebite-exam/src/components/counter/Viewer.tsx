import { useCount, useCountStore } from "@/store/count";

export default function Viewer() {
  //   const { count } = useCountStore();
  const count = useCount();
  return <div>{count}</div>;
}
