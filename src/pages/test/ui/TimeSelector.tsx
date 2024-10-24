import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useRef } from "react";

interface TimeSelectorProps {
  label: string;
  range: number;
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
        `[data-value="${value}"]`,
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [value]);

  return (
    <div className="flex flex-col overflow-hidden rounded border">
      <span className="mb-1 border-b border-b-indigo-500 bg-indigo-500/20 p-2 text-center text-lg font-bold">
        {label}
      </span>
      <ScrollArea className="flex max-h-64 w-36 flex-col overflow-y-auto rounded-lg bg-white shadow-md">
        <div ref={scrollRef}>
          {Array.from({ length: range }, (_, i) => (
            <div
              key={i + 1}
              data-value={i + 1}
              className={`cursor-pointer px-4 py-2 text-center hover:bg-blue-100 ${
                value === i + 1 ? "bg-blue-200" : ""
              }`}
              onClick={() => onChange(i + 1)}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
