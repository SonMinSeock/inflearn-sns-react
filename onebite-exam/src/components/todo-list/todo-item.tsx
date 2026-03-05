import type { Todo } from "@/types";
import { Button } from "../ui/button";

import { Link } from "react-router";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutaion";

export default function TodoItem({ id, content, isDone }: Todo) {
  const { mutate } = useUpdateTodoMutation();

  const handleCheckboxClick = () => {
    mutate({
      id,
      isDone: !isDone,
    });
  };

  const handleDeleteClick = () => {};

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input type="checkbox" checked={isDone} onClick={handleCheckboxClick} />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button variant={"destructive"} onClick={handleDeleteClick}>
        삭제
      </Button>
    </div>
  );
}
