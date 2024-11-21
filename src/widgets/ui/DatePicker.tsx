import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/shared/utils";
import { Button } from "@/widgets/ui/button";
import { Calendar } from "@/widgets/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/widgets/ui/popover";
import { ko } from "date-fns/locale";

interface DatePickerProps {
  value: Date;
  onChange?: (date: Date) => void;
  disabled?: boolean;
  toDate?: Date;
  fromDate?: Date;
}

export function DatePicker({
  value,
  onChange,
  disabled,
  toDate,
  fromDate,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>(value);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <Popover
      open={disabled ? false : open}
      onOpenChange={disabled ? undefined : setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
            disabled && "cursor-not-allowed opacity-50",
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy년 MM월 dd일") : <span>날짜 선택</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          onSelect={(date) => {
            if (!date) {
              setOpen(false);
              return;
            }
            setDate(date ?? new Date());
            setOpen(false);
            onChange?.(date ?? new Date());
          }}
          locale={ko}
          initialFocus
          formatters={{
            formatCaption: (date) => {
              return format(date, "yyyy년 M월", { locale: ko });
            },
          }}
          today={new Date()}
          disabled={disabled}
          fromDate={fromDate}
          toDate={toDate}
        />
      </PopoverContent>
    </Popover>
  );
}
