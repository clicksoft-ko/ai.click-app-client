import { ClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils";

interface FloatButtonProps extends ClassNameProps {
  icon: React.ReactNode;
  onClick: () => void;
  style?: React.CSSProperties;
}
export const FloatButton = ({
  onClick,
  style,
  icon,
  className,
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
    >
      {icon}
    </button>
  );
};
