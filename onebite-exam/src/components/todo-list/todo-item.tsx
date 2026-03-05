import type { Todo } from "@/types";
import { Button } from "../ui/button";

import { Link } from "react-router";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutaion";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation";

export default function TodoItem({ id, content, isDone }: Todo) {
  const { mutate: updateTodoMutate } = useUpdateTodoMutation();
  const { mutate: deleteTodoMutate, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();

  const handleCheckboxClick = () => {
    updateTodoMutate({
      id,
      isDone: !isDone,
    });
  };

  const handleDeleteClick = () => {
    deleteTodoMutate(id);
  };

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          type="checkbox"
          checked={isDone}
          disabled={isDeleteTodoPending}
          onClick={handleCheckboxClick}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        variant={"destructive"}
        disabled={isDeleteTodoPending}
        onClick={handleDeleteClick}
      >
        삭제
      </Button>
    </div>
  );
}
