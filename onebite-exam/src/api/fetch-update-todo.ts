import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

/**
 * 해당 Todo를 수정 요청하는 비동기 fetch 함수
 * Partial 제내릭 -> todo 모든 프로퍼티들을 옵셔널로 해준다. id는 무조건 받도록 한다.
 */
export async function fetchUpdateTodo(todo: Partial<Todo> & { id: string }) {
  const response = await fetch(`${API_URL}/todos1111/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });

  if (!response.ok) throw new Error("Update Todo Failed");

  const data: Todo = await response.json();

  return data;
}
