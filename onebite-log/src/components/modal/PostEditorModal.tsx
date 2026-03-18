import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { usePostEditorModal } from "@/store/postEditorModal";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useCreatePost } from "@/hooks/mutations/post/useCreatePost";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const { isOpen, close } = usePostEditorModal();

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      close();
    },
    onError: (error) => {
      toast.error("포스트 생성에 실패 했습니다.", {
        position: "top-center",
      });
    },
  });

  const handleCloseModal = () => {
    close();
  };

  const handleCreatePostClick = () => {
    if (content.trim() === "") return;

    createPost(content);
  };

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }

    // 초기화
    event.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl),
    );
  };

  // 입력 내용에 따라 textarea 높이를 자동으로 늘리고 줄임
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 초기화
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) return;
    // 모달 열렸을때 textarea 요소에 포커스 되도록 한다.
    textareaRef.current?.focus();
    setContent("");
    setImages([]);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          disabled={isCreatePostPending}
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="무슨일이 있어나요?"
          value={content}
          ref={textareaRef}
          onChange={(event) => setContent(event.target.value)}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleSelectImages}
        />
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.previewUrl} className="basis-2/5">
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      className="h-full w-full rounded-sm object-cover"
                    />
                    <div
                      className="absolute top-0 right-0 cursor-pointer rounded-full bg-black/30 p-1"
                      onClick={() => handleDeleteImage(image)}
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <Button
          disabled={isCreatePostPending}
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          <ImageIcon />
          이미지 추가
        </Button>
        <Button
          disabled={isCreatePostPending}
          className="cursor-pointer"
          onClick={handleCreatePostClick}
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
}
