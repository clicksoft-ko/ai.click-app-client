import { ChildrenClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";
import { BadgeInfo } from "lucide-react";

interface Props extends ChildrenClassNameProps {
  title: string;
}

export function TitleGroup({ title, children, className }: Props) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div className="mb-2 flex w-fit items-center gap-4 border-b border-b-blue-200 p-2">
        <BadgeInfo className="text-blue-500" />
        <h2 className="text-xl font-bold text-blue-500">{title}</h2>
      </div>
      {children}
    </div>
  );
}
