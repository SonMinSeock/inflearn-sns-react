import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

/**
 * 해당 Todo를 삭제 요청하는 비동기 fetch 함수
 */
export async function fetchDeleteTodo(id: string) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Delete Todo Failed");

  const data: Todo = await response.json();

  return data;
}
