import { cn } from "@/shared/utils/utils";

interface CommonButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const CommonButton = ({
  onClick,
  children,
  className,
  disabled,
}: CommonButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex-center gap-2 rounded-md px-4 py-2 transition-colors xl:py-3",
      className,
    )}
  >
    {children}
  </button>
);
