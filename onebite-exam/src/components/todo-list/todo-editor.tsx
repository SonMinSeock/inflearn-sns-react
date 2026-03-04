import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, type ChangeEvent } from "react";
import { useCreateTodoMutation } from "@/hooks/mutations/use-create-todo-mutation";

export default function TodoEditor() {
  const { mutate, isPending } = useCreateTodoMutation();

  const [content, setContent] = useState("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleAddClick = () => {
    if (content.trim() === "") return;
    mutate(content);
    setContent("");
  };

  return (
    <div className="flex gap-2">
      <Input
        value={content}
        placeholder="새로운 할 일을 입력하세요... "
        onChange={handleChangeInput}
      />
      <Button disabled={isPending} onClick={handleAddClick}>
        추가
      </Button>
    </div>
  );
}
