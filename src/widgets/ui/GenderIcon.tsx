import { ClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";
import { IoMdFemale, IoMdMale } from "react-icons/io";

export interface GenderIconProps extends ClassNameProps {
  gender: string;
}

export function GenderIcon({ gender, className }: GenderIconProps) {
  return gender === "M" ? (
    <IoMdMale className={cn("ml-2 text-blue-500", className)} />
  ) : (
    <IoMdFemale className={cn("ml-2 text-red-500", className)} />
  );
}
