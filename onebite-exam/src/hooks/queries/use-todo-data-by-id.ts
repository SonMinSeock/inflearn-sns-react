import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";

/**
 * 해당 Todo 데이터를 조회 요청 하는 useQuery 커스텀 훅
 */
export function useTodoDataById(id: string, type: "LIST" | "DETAIL") {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: QUERY_KEYS.todo.detail(id),
    enabled: type === "DETAIL", // type이 DETAIL 일때 만 리패칭 즉 todo detail 페이지에서 리패칭 하도록
  });
}
