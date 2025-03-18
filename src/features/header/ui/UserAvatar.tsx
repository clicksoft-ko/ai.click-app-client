import { useAuth, useSignOut } from "@/shared/hooks/auth";
import { imgPaths, paths } from "@/shared/paths";
import { cn } from "@/shared/utils";
import { IconButton } from "@/widgets/buttons";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@/widgets/ui";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserAvatarProps {}

export function UserAvatar({}: UserAvatarProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const { signOut } = useSignOut();

  function handleToSetting(): void {
    navigate(paths.setting);
    setOpen(true);
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <img
            className={cn("mr-1 h-11 w-11 rounded", "hover:cursor-pointer")}
            src={imgPaths.logo.small}
            alt="user"
          />
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">{`${user?.name}(${user?.csUserId})`}</h4>
                <p className="text-sm text-muted-foreground">
                  {`${user?.orgName} (${user?.hsUserId})`}
                </p>
              </div>
              <IconButton
                variant="gray"
                onClick={handleToSetting}
                icon={<Settings />}
              />
            </div>
            <div className="grid gap-2">
              <Button onClick={signOut} variant={"destructive"}>
                로그아웃
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
