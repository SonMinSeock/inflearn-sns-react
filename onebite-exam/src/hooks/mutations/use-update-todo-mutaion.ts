import { fetchUpdateTodo } from "@/api/fetch-update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUpdateTodo,
    onMutate: async (updatedTodo) => {
      // 만약에 업데이트 하기전에 todos 조회하고 있는 중이면 조회 요청들을 취소하라고 할수있다.
      // 진행중인 요청이 나중에 overwrite 하는 걸 방지.
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.list,
      });

      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);

      // 낙관적 업데이트
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];

        return prevTodos.map((prevTodo) =>
          prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo,
        );
      });

      return { prevTodos };
    },
    onError: (error, variable, context) => {
      // context는 onMutate 반환 하고 있는 값이다.
      // 원상 복구
      if (context && context.prevTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos,
        );
      }
    },
    onSettled: () => {
      // 만약에 낙관적으로 업데이트 한 것이 서버에 저장한게 다른걸로 저장할 수 있다. 무결성 깨질수 있다.
      // 무효화 하고 서버로 불러온 값으로 갱신
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
