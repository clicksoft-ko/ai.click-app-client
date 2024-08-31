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
        "fixed bottom-4 right-4 w-fit rounded-full border-2 border-blue-200 bg-blue-500 p-2 font-bold",
        "hover:cursor-pointer",
      )}
    >
      <GoGraph className="text-white" />
    </button>
  );
};
