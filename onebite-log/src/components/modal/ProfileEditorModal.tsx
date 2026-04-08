import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { useSession } from "@/store/session";
import Fallback from "../Fallback";
import Loader from "../Loader";
import defaultAvatar from "@/assets/default-avatar.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfileEditorModal } from "@/store/profileEditorModal";

export default function ProfileEditorModal() {
  const session = useSession();
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchProfilePending,
  } = useProfileData(session?.user.id);

  const {
    isOpen,
    actions: { close },
  } = useProfileEditorModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-5">
        <DialogTitle>프로필 수정하기</DialogTitle>
        {fetchProfileError && <Fallback />}
        {isFetchProfilePending && <Loader />}
        {!fetchProfileError && !isFetchProfilePending && (
          <>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">프로필 이미지</div>
              <img
                src={profile.avatar_url || defaultAvatar}
                className="h-20 w-20 cursor-pointer rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">닉네임</div>
              <Input />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">소개</div>
              <Input />
            </div>
            <Button className="cursor-pointer">수정하기</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
