import { imgPaths } from "@/shared/paths";
import { cn } from "@/shared/utils";

interface UserAvatarProps { }
export function UserAvatar({ }: UserAvatarProps) {
  return (
    <img
      className={cn(
        "m-1 h-9 w-9 rounded-full border border-primary/50 object-none",
        "hover:cursor-pointer"
      )}
      src={imgPaths.logo.small}
      alt="user" />
  );
}
