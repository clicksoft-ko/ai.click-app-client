import { cn } from "@/shared/utils/utils";

export const NoteLine = ({
  lineStyle,
  canvasSize,
  ref,
}: {
  lineStyle: "dotted" | "solid" | "none";
  canvasSize: { width: number; height: number };
  ref?: React.RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex flex-col justify-between opacity-50"
      style={{
        width: canvasSize.width,
        height: canvasSize.height,
      }}
    >
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          className={cn(
            "border-gray-300",
            index === 0 || index === 11 ? "opacity-0" : "",
          )}
          style={{
            borderStyle: lineStyle,
            borderWidth: lineStyle === "dotted" ? "3px 0 0 0" : "1px 0 0 0", // 위쪽 테두리만 설정
          }}
          key={index}
        ></div>
      ))}
    </div>
  );
};
