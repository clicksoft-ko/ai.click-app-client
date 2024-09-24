import { SelectPatButton, UserAvatar } from "@/features/header/ui";
import { imgPaths } from "@/shared/paths";
import { cn } from "@/shared/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/widgets/ui";
import { RxHamburgerMenu } from "react-icons/rx";
import { Links } from "./Links";
import { useState } from "react";

export const MainHeader = () => {
  return (
    <header className="flex h-header w-full items-center justify-between bg-gray-100 px-2">
      <nav className="flex items-center gap-2">
        <div className="hidden items-center gap-2 sm:flex">
          <img
            className={cn(
              "m-1 h-9 w-9 rounded object-none",
              "hover:cursor-pointer",
            )}
            src={imgPaths.logo.small}
            alt="user"
          />
          <Links />
        </div>
        <HamMenu />
      </nav>
      <div className="flex">
        <SelectPatButton />
        <UserAvatar />
      </div>
    </header>
  );
};

const HamMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <button>
          <RxHamburgerMenu
            className={cn("sm:hidden", "h-10 w-10 p-2", "hover:text-blue-500")}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className={cn("flex flex-col gap-2")}>
        <Links onClick={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};
