import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/utils";
import { Button } from "@/widgets/ui/button";
import { Calendar } from "@/widgets/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/widgets/ui/popover";
import { ko } from "date-fns/locale";

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-40 justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy년 MM월 dd일") : <span>날짜 선택</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={ko}
          initialFocus
          formatters={{
            formatCaption: (date) => {
              return format(date, "yyyy년 M월", { locale: ko });
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
