import { fetchCreateTodo } from "@/api/fetch-create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCreateTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: (newTodo) => {
      // queryClient.invalidateQueries({
      //   queryKey: QUERY_KEYS.todo.list,
      // });
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodo) => {
        if (!prevTodo) return [newTodo];
        return [...prevTodo, newTodo];
      });
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
