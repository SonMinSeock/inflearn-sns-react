import { useCreateTodo } from "@/store/todos";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, type ChangeEvent } from "react";

export default function TodoEditor() {
  const [content, setContent] = useState("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const createTodo = useCreateTodo();

  const handleAddClick = () => {
    if (content.trim() === "") return;

    createTodo(content);
    setContent("");
  };

  return (
    <div className="flex gap-2">
      <Input
        value={content}
        placeholder="새로운 할 일을 입력하세요... "
        onChange={handleChangeInput}
      />
      <Button onClick={handleAddClick}>추가</Button>
    </div>
  );
}
