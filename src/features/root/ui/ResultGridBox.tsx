import { TitleValueDetail } from "@/shared/dto/socket-io";
import { cn } from "@/shared/utils";

export interface VitalDetailProps extends TitleValueDetail {
  isOdd: boolean;
}

export function ResultGridBox({
  title,
  value,
  isOdd,
  spanCount,
}: VitalDetailProps) {
  return (
    <div
      key={title}
      className={cn(
        "flex flex-col border border-primary/30 text-center shadow",
        spanCount ? spanObj[spanCount] : "",
      )}
    >
      <div
        className={cn(
          "px-2 py-1 text-black",
          isOdd ? "bg-green-100" : "bg-pink-100",
        )}
      >
        {title}
      </div>
      <div
        className={cn(
          "px-2 py-1 font-semibold",
          isOdd ? "bg-white" : "bg-white",
        )}
      >
        {value}
      </div>
    </div>
  );
}

const spanObj: { [key: string]: string } = {
  "2": "col-span-2",
  "3": "col-span-3",
  "4": "col-span-4",
  "5": "col-span-5",
  "6": "col-span-6",
  "7": "col-span-7",
  "8": "col-span-8",
  "9": "col-span-9",
  "10": "col-span-10",
  "11": "col-span-11",
  "12": "col-span-12",
};
