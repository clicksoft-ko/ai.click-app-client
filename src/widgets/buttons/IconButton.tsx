import { ClassNameProps } from "@/shared/interfaces/props";
import { cn } from "@/shared/utils/utils";

export interface IconButtonProps extends ClassNameProps {
  onClick?: () => void;
  variant: "red" | "blue" | "gray";
  children?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const IconButton = ({
  onClick,
  className,
  variant,
  children,
  isLoading = false,
  disabled = false,
  icon,
}: IconButtonProps) => {
  const colors = {
    red: "bg-red-100 text-red-600 hover:bg-red-200",
    blue: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    gray: "bg-gray-100 text-gray-600 hover:bg-gray-200",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "flex items-center gap-2 rounded-md px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        colors[variant],
        isLoading ? "cursor-not-allowed opacity-50" : "",
        className,
      )}
    >
      {isLoading ? (
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
};
