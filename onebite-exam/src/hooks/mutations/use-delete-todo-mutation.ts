import { fetchDeleteTodo } from "@/api/fetch-delete-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchDeleteTodo,
    // 1. 캐시 무효화 -> invalidateQueries
    // 2. 수정 요청의 성공 했을때 업데이트 -> onSuccess
    // 3. 낙관적 업데이트 -> onMutate
    onSuccess: async (deleteTodo) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.todo.detail(deleteTodo.id),
      });
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [];
          return prevTodoIds.filter(
            (prevTodoId) => prevTodoId !== deleteTodo.id,
          );
        },
      );
    },
  });
}
