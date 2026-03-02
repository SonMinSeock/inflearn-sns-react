import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

// todos의 비동기 fetch 함수 정의
export async function fetchTodos() {
  const response = await fetch(`${API_URL}/todos`);

  if (!response.ok) {
    throw new Error("Fetch Failed");
  }

  const data: Todo[] = await response.json();
  return data;
}
