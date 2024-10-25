import { ScrollArea } from "@/widgets/ui";
import { useEffect, useRef } from "react";

interface TimeSelectorProps {
  label: string;
  range: {
    min: number;
    max: number;
  };
  value: number | undefined;
  onChange: (value: number | undefined) => void;
}

export const TimeSelector = ({
  label,
  range,
  value,
  onChange,
}: TimeSelectorProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && scrollRef.current) {
      const selectedElement = scrollRef.current.querySelector(
        `[data-value="${label}-${value}"]`,
      );
      selectedElement?.scrollIntoView({ behavior: "auto", block: "center" });
    }
  }, [value]);

  return (
    <div className="flex flex-col overflow-hidden rounded border">
      <span className="mb-1 border-b border-b-indigo-500 bg-indigo-500/20 p-2 text-center text-lg font-bold">
        {label}
      </span>
      <ScrollArea
        ref={scrollRef}
        className="flex max-h-64 w-36 flex-col overflow-y-auto rounded-lg bg-white shadow-md"
      >
        {Array.from({ length: range.max - range.min + 1 }, (_, i) => (
          <div
            key={i + range.min}
            data-value={`${label}-${i + range.min}`}
            className={`cursor-pointer px-4 py-2 text-center hover:bg-blue-100 ${
              value === i + range.min ? "bg-blue-200" : ""
            }`}
            onClick={() => onChange(i + range.min)}
          >
            {String(i + range.min).padStart(2, "0")}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
