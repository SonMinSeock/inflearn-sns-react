import { fetchUpdateTodo } from "@/api/fetch-update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUpdateTodo,
    onMutate: (updatedTodo) => {
      // 낙관적 업데이트
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];

        return prevTodos.map((prevTodo) =>
          prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo,
        );
      });
    },
  });
}
