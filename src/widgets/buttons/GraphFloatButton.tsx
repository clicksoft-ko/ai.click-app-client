import { cn } from "@/shared/utils";
import { GoGraph } from "react-icons/go";

interface GraphFloatButtonProps {
  onClick: () => void;
}
export const GraphFloatButton = ({ onClick }: GraphFloatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed w-fit rounded-full border-2 border-blue-200 bg-blue-500 p-2 font-bold",
        "hover:cursor-pointer",
      )}
      style={{
        top: `calc(var(--vh) * 100 - 9.5rem)`,
        right: `1rem`,
      }}
    >
      <GoGraph className="text-white" />
    </button>
  );
};
