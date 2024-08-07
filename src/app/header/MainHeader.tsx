import { SelectPatButton, UserAvatar } from "@/features/header/ui";
import { imgPaths, paths } from "@/shared/paths";
import { cn } from "@/shared/utils";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const links = [
  { to: paths.medical, label: "진료" },
  { to: paths.ward, label: "병동" },
];

export const MainHeader = () => {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between bg-gray-100 px-2">
      <nav className="flex items-center gap-2">
        <img
          className={cn(
            "m-1 h-9 w-9 rounded border border-primary/50 object-none",
            "hover:cursor-pointer",
          )}
          src={imgPaths.logo.small}
          alt="user"
        />
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "rounded px-4 py-2 text-black",
                isActive ? "border bg-white text-blue-800" : "",
              )
            }
          >
            {link.label}
          </NavLink>
        ))}

        <RxHamburgerMenu
          className={cn(
            "h-10 w-10 p-2",
            "hover:cursor-pointer hover:text-blue-500",
          )}
        />
      </nav>
      <div className="flex">
        <SelectPatButton />
        <UserAvatar />
      </div>
    </header>
  );
};
