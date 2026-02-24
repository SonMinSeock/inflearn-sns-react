import "./App.css";
import { Button } from "@/components/ui/button";
import { cn } from "./lib/utils";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { toast, Toaster } from "sonner";

function App() {
  const isActive = true;

  return (
    <div className="p-5">
      <Toaster />
      <Textarea />
      <Input placeholder="입력..." />
      <Button
        onClick={() => {
          toast("토스트 메시지", {
            position: "top-center",
          });
        }}
      >
        버튼!
      </Button>
      <Button variant={"destructive"}>버튼</Button>
      <Button variant={"ghost"}>버튼</Button>
      <Button variant={"link"}>버튼</Button>
      <Button variant={"outline"}>버튼</Button>
      <Button variant={"secondary"}>버튼</Button>
      <div
        className={cn(
          "w-10 text-sm",
          isActive ? "text-green-500" : "text-red-500",
        )}
      >
        isActive
      </div>
      <div className="text-primary">Primary</div>
      <div className="text-muted">Muted</div>
      <div className="text-destructive">Destructive</div>
    </div>
  );
}

export default App;
