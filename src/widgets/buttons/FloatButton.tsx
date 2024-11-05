import { cn } from "@/shared/utils";
import { ButtonHTMLAttributes } from "react";

interface FloatButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
}
export const FloatButton = ({
  onClick,
  style,
  icon,
  className,
  ...props
}: FloatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed w-fit rounded-full border-2 border-blue-200 bg-blue-500 p-2 font-bold",
        "hover:cursor-pointer",
        className,
      )}
      style={{
        bottom: `1rem`,
        right: `1rem`,
        ...style,
      }}
      {...props}
    >
      {icon}
    </button>
  );
};
