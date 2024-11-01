import { Vs } from "@/shared/dto/socket-io";
import { useAuth } from "@/shared/hooks/auth";
import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { useVsInputStore } from "@/shared/stores";
import { cn } from "@/shared/utils";
import { formatTime } from "@/shared/utils/formats";
import { NumberKeyboard, TimeKeyboard } from "@/widgets/keyboards";
import { Column, Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useVsWriteMenus } from "../../hooks";
import { VsKeyboardHeader } from "./VsKeyboardHeader";
import { VsKeyboardWrapper } from "./VsKeyboardWrapper";
import { columnSettings } from "../consts";

interface EditInputProps {
  row: Row<Vs>;
  column: Column<Vs>;
  onFocus: (focused: boolean) => void;
}

const useColumnType = (columnId: string) => {
  const { type } = columnSettings[columnId as keyof Vs] ?? {};
  return {
    isTimeColumn: type === "time",
    isNurseColumn: type === "nurse",
    isTextColumn: type === "text",
    isNumberColumn: type === "number",
  };
};

export const EditInput = ({ row, column, onFocus }: EditInputProps) => {
  const setVsByRow = useVsInputStore((state) => state.setVsByRow);
  const [focused, setFocused] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const isTimeValid = (row.original.time ?? "").length >= 4;
  const inputRef = useRef<HTMLInputElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const vsKey = column.id as keyof Vs;
  const value = row.original[vsKey];
  const { isTimeColumn, isNurseColumn, isTextColumn } = useColumnType(vsKey);
  const { viewMenus } = useVsWriteMenus();
  const { user } = useAuth();

  useEffect(() => {
    if (focused && !isNurseColumn && !isTextColumn) {
      inputRef.current?.select();
      setShowKeyboard(true);
    }
    if (focused && !isTimeValid) {
      setVsByRow(row.index, "nurse", user?.name ?? "");
      setVsByRow(row.index, "time", dayjs().format("HHmm"));
    }
    onFocus(focused);
  }, [focused]);

  useOutsideClick(
    [inputRef, keyboardRef],
    () => {
      setShowKeyboard(false);
      setFocused(false);
    },
    showKeyboard,
  );

  const handleNextColumnFocus = (row: Row<Vs>, column: Column<Vs>) => {
    const index = viewMenus.findIndex((menu) => menu === column.id);
    const nextColumn = isTimeColumn
      ? viewMenus?.[0]
      : index === -1
        ? undefined
        : viewMenus?.[index + 1];

    if (!nextColumn) {
      setFocused(false);
      setShowKeyboard(false);
      return;
    }

    setShowKeyboard(false);

    const nextInput = document.getElementById(
      getInputId(row.index, nextColumn),
    );
    nextInput?.focus();
  };

  return (
    <>
      <input
        id={getInputId(row.index, column.id)}
        ref={inputRef}
        onFocus={() => {
          inputRef.current?.select();
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        className={cn(
          "flex h-full w-full bg-transparent text-center",
          (focused || showKeyboard) && "border border-blue-500 bg-white",
        )}
        type="text"
        readOnly={!isTextColumn}
        onChange={(e) => {
          setVsByRow(row.index, vsKey, e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleNextColumnFocus(row, column);
          }
        }}
        value={(isTimeColumn ? formatTime(value as string) : value) ?? ""}
      />

      <VsKeyboardWrapper ref={keyboardRef} showKeyboard={showKeyboard}>
        <VsKeyboardHeader
          vs={row.original}
          currentValue={vsKey}
          isTimeColumn={isTimeColumn}
        />
        <VsKeyboards
          vsKey={vsKey}
          showKeyboard={showKeyboard}
          timeValue={row.original.time ?? ""}
          onValueChange={(value) => {
            setVsByRow(row.index, vsKey, value);
          }}
          onNext={() => handleNextColumnFocus(row, column)}
        />
      </VsKeyboardWrapper>
    </>
  );
};

interface VsKeyboardsProps {
  vsKey: keyof Vs;
  showKeyboard: boolean;
  timeValue: string;
  onValueChange: (value: string) => void;
  onNext: () => void;
}

const VsKeyboards = ({
  vsKey,
  showKeyboard,
  timeValue,
  onValueChange,
  onNext,
}: VsKeyboardsProps) => {
  const { isTimeColumn, isNurseColumn, isTextColumn, isNumberColumn } =
    useColumnType(vsKey);
  return (
    <>
      {isTimeColumn && (
        <TimeKeyboard
          showKeyboard={showKeyboard}
          timeValue={timeValue}
          onValueChange={onValueChange}
          onNext={onNext}
        />
      )}
      {isNumberColumn && (
        <VsInputKeyboard
          showKeyboard={showKeyboard}
          onValueChange={onValueChange}
          onNext={onNext}
        />
      )}
    </>
  );
};

const VsInputKeyboard = ({
  showKeyboard,
  onValueChange,
  onNext,
}: {
  showKeyboard: boolean;
  onValueChange: (value: string) => void;
  onNext: () => void;
}) => {
  const [value, setValue] = useState("");
  const firstRef = useRef(true);

  useEffect(() => {
    if (showKeyboard && !firstRef.current) {
      onValueChange(value);
    } else {
      setValue("");
    }
  }, [value, showKeyboard]);

  useEffect(() => {
    firstRef.current = !showKeyboard;
  }, [showKeyboard]);

  return (
    <NumberKeyboard
      onClick={(value) => setValue((prev) => prev + value)}
      onDelete={() => {
        const newValue = value.slice(0, -1);
        setValue(newValue);
        if (newValue.length === 0) {
          onValueChange("");
        }
      }}
      onNext={onNext}
    />
  );
};

function getInputId(rowIndex: number, columnId: string) {
  return `input-${rowIndex}-${columnId}`;
}
