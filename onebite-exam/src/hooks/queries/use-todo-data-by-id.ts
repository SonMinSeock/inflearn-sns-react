import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { useQuery } from "@tanstack/react-query";

/**
 * 해당 Todo 데이터를 조회 요청 하는 useQuery 커스텀 훅
 */
export function useTodoDataById(id: string) {
  return useQuery({
    queryFn: () => fetchTodoById(id),
    queryKey: ["todos", id],
    staleTime: 30000,
    gcTime: 5000,
    // refetchOnMount: false,
    // refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    // refetchInterval: false,
  });
}
