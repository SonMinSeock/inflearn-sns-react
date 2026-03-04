import { fetchCreateTodo } from "@/api/fetch-create-todo";
import { useMutation } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  return useMutation({
    mutationFn: fetchCreateTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error) => {
      window.alert(error.message);
    },
  });
}
