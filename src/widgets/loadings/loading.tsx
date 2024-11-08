import { cn } from "@/shared/utils";

interface LoadingProps {
  className?: string;
  pointerEventsNone?: boolean;
}

export const Loading = ({
  className,
  pointerEventsNone = true,
}: LoadingProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex items-center justify-center bg-white/80",
        pointerEventsNone && "pointer-events-none",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        <span className="text-lg font-medium text-gray-700 [text-shadow:_-2px_-2px_0_#fff,_2px_-2px_0_#fff,_-2px_2px_0_#fff,_2px_2px_0_#fff]">
          잠시만 기다려주세요...
        </span>
      </div>
    </div>
  );
};
