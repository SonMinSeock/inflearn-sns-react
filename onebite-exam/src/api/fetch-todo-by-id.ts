import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

/**
 * 해당 todo GET 요청하는 비동기 fetch 함수
 */
export async function fetchTodoById(id: number) {
  const response = await fetch(`${API_URL}/todos/${id}`);

  if (!response.ok) {
    throw new Error("Fetch Failed");
  }

  const data: Todo = await response.json();
  return data;
}
