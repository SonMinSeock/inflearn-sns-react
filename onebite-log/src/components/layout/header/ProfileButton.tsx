import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useProfileData } from "@/hooks/queries/useProfileData";
import { useSession } from "@/store/session";
import defaultAvatar from "@/assets/default-avatar.png";
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router";
import { signOut } from "@/api/auth";

export default function ProfileButton() {
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id);

  if (!session) return null;

  return (
    <Popover>
      <PopoverTrigger>
        <img
          src={profile?.avatar_url || defaultAvatar}
          className="h-6 w-6 cursor-pointer rounded-full object-cover"
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-40 flex-col p-0">
        <PopoverClose asChild>
          <Link to={`/profile/${session.user.id}`}>
            <div className="hover:bg-muted cursor-pointer px-3 py-3 text-sm">
              프로필
            </div>
          </Link>
        </PopoverClose>
        <PopoverClose asChild>
          <div
            className="hover:bg-muted cursor-pointer px-3 py-3 text-sm"
            onClick={signOut}
          >
            로그아웃
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
