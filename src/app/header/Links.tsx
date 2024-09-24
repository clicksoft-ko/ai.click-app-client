import { paths } from "@/shared/paths";
import { cn } from "@/shared/utils";
import { NavLink } from "react-router-dom";

const links = [
  { to: paths.medical, label: "진료" },
  { to: paths.ward, label: "병동" },
];

interface LinksProps {
  onClick?: () => void;
}

export const Links = ({ onClick }: LinksProps) => {
  return links.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "rounded px-4 py-2 text-black",
          isActive ? "border bg-white text-blue-800" : "",
        )
      }
    >
      {link.label}
    </NavLink>
  ));
};
