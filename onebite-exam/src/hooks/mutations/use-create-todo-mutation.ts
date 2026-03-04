import { fetchCreateTodo } from "@/api/fetch-create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCreateTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
