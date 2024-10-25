import { cn } from "@/shared/utils";
import { vsMenuName } from "../consts/vs-menu-name";
import { Vs } from "@/shared/dto/socket-io";

export const VsKeyboardHeader = ({
  vs,
  currentValue,
}: {
  vs: Vs;
  currentValue: keyof Vs;
  isTimeColumn?: boolean;
}) => {
  const vsValue = vs[currentValue];

  return (
    <div className={cn(
      "flex items-center justify-between",
        "rounded-t-lg",
        "bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600",
        "p-4",
        "shadow-lg",
    )}>
      <span className="text-xl font-bold text-white">
        시간: {vs.time.slice(0, 2)}:{vs.time.slice(2)}
      </span>
      <div className="flex items-center">
        <span className="mr-2 text-lg text-white">
          {vsMenuName[currentValue]}:
        </span>
        <span
          className={cn(
            "rounded-full bg-white px-3 py-1 text-lg font-semibold text-indigo-800 shadow-inner",
            !vsValue && "text-gray-400",
          )}
        >
          {vsValue ? vsValue : "Empty"}
        </span>
      </div>
    </div>
  );
};
