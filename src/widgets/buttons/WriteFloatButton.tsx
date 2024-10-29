import { BsPencilSquare } from "react-icons/bs";
import { FloatButton } from "./FloatButton";
import { ClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";

interface WriteFloatButtonProps extends ClassNameProps {
  onClick: () => void;
  style?: React.CSSProperties;
}

export const WriteFloatButton = ({
  onClick,
  style,
  className,
}: WriteFloatButtonProps) => {
  return (
    <FloatButton
      className={cn("bg-green-500 border-green-200", className)}
      onClick={onClick}
      icon={<BsPencilSquare className="text-white" />}
      style={style}
    />
  );
};
