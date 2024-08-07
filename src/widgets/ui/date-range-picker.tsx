"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { ko } from "date-fns/locale";
import dayjs, { ManipulateType } from "dayjs";
import { PopoverClose } from "@radix-ui/react-popover";
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from ".";
import { cn } from "@/shared/utils";
import { DateRange, DateRangeType } from "@/shared/interfaces/shadcn";
import "react-day-picker/dist/style.css";

interface Props {
  onDateChange: (date: DateRange) => void;
  defaultDateRange?: DateRangeType;
}

export function DateRangePicker({
  defaultDateRange,
  className,
  onDateChange,
}: React.HTMLAttributes<HTMLDivElement> & Props) {
  const popupRef = React.useRef<HTMLDivElement>(null);
  const [date, setDate] = React.useState<DateRangeType | undefined>(
    defaultDateRange || {
      from: new Date(),
      to: new Date(),
    },
  );

  React.useEffect(() => {
    const dateRange = new DateRange(date?.from, date?.to);
    onDateChange(dateRange);
  }, [date, onDateChange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover
        onOpenChange={(_) => {
          if (popupRef.current) {
            popupRef.current.scrollTop = 0;
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "h-full w-fit justify-start border-primary/50 text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format("YYYY-MM-DD")} -{" "}
                  {dayjs(date.to).format("YYYY-MM-DD")}
                </>
              ) : (
                dayjs(date.from).format("YYYY-MM-DD")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          ref={popupRef}
          onLoad={() => {
            console.log(1);
          }}
          className="flex max-h-[34rem] w-auto flex-col p-0"
          align="start"
        >
          <DropdownContent date={date} setDate={setDate} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

interface DropdownContentProps {
  date: DateRangeType | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRangeType | undefined>>;
}

function DropdownContent({ date, setDate }: DropdownContentProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  // 스크롤이 하단으로 내려가는 버그현상이 있어서 추가
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = 0;
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={ref} className="h-full overflow-y-auto">
      <PopoverClose className="mx-auto flex justify-center gap-1 py-1">
        <TermButton setDate={setDate} value={-1} unit="week">
          1주
        </TermButton>
        <TermButton setDate={setDate} value={-1} unit="month">
          1달
        </TermButton>
        <TermButton setDate={setDate} value={-3} unit="month">
          3달
        </TermButton>
        <TermButton setDate={setDate} value={-6} unit="month">
          6달
        </TermButton>
        <TermButton setDate={setDate} value={-1} unit="year">
          1년
        </TermButton>
        <TermButton setDate={setDate} value={-10} unit="year">
          10년
        </TermButton>
      </PopoverClose>

      <div className="flex flex-col sm:flex-row">
        <CustomCalendar
          defaultMonth={date?.from}
          selected={date?.from}
          onSelect={(date) => setDate((prev) => ({ from: date, to: prev?.to }))}
        />
        <CustomCalendar
          defaultMonth={date?.to}
          selected={date?.to}
          onSelect={(date) =>
            setDate((prev) => ({ from: prev?.from, to: date }))
          }
        />
      </div>
    </div>
  );
}
interface CustomCalendarProps {
  defaultMonth?: Date;
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
}
function CustomCalendar({
  selected,
  defaultMonth,
  onSelect,
}: CustomCalendarProps) {
  return (
    <Calendar
      initialFocus
      captionLayout="dropdown-buttons"
      classNames={{
        button: "text-gray-500",
        caption_label:
          "flex items-center justify-start w-20 text-base font-medium",
        dropdown: "rdp-dropdown",
        dropdown_icon: "ml-2",
        dropdown_year: "rdp-dropdown_year ml-3",
        caption_dropdowns: "w-full flex flex-row-reverse justify-end",
      }}
      fromYear={1995}
      toYear={dayjs().add(1, "year").year()}
      locale={ko}
      mode="single"
      onSelect={(date) => {
        if (date) onSelect(date);
      }}
      defaultMonth={defaultMonth}
      selected={selected}
    />
  );
}
function TermButton({
  value,
  unit,
  children,
  setDate,
}: {
  value: number;
  unit: ManipulateType;
  children: React.ReactNode;
  setDate: React.Dispatch<React.SetStateAction<DateRangeType | undefined>>;
}) {
  function setTerm(value: number, unit: ManipulateType) {
    setDate({
      from: dayjs().add(value, unit).add(1, "d").toDate(),
      to: dayjs().toDate(),
    });
  }

  return (
    <div
      className="border-primary-sm rounded-xl border p-2 text-sm hover:bg-primary hover:text-primary-foreground"
      onClick={() => {
        setTerm(value, unit);
      }}
    >
      {children}
    </div>
  );
}
