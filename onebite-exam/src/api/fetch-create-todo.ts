import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

/**
 * 입력 한 Todo를 추가 요청하는 비동기 fetch 함수
 */
export async function fetchCreateTodo(content: string) {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify({
      content,
      isDone: false,
    }),
  });

  if (!response.ok) throw new Error("Create Todo Failed");

  const data: Todo = await response.json();

  return data;
}
