import { useAuth } from "@/shared/hooks/auth";
import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { useVsInputStore } from "@/shared/stores";
import { cn } from "@/shared/utils";
import { Column, Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { viewMenus } from "../consts/view-menus";
import { Vs } from "@/shared/dto/socket-io";
import { Keyboard } from "./Keyboard";
import { TimeKeyboard } from "./TimeKeyboard";
import { VsKeyboardWrapper } from "./VsKeyboardWrapper";
import { VsKeyboardHeader } from "./VsKeyboardHeader";
import { formatTime } from "@/shared/utils/formats";

interface EditInputProps {
  row: Row<Vs>;
  column: Column<Vs>;
  onFocus: (focused: boolean) => void;
}

export const EditInput = ({ row, column, onFocus }: EditInputProps) => {
  const setVsByRow = useVsInputStore((state) => state.setVsByRow);
  const [focused, setFocused] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const isTimeValid = row.original.time.length >= 4;
  const inputRef = useRef<HTMLInputElement>(null);
  const keyboardRef = useRef<HTMLDivElement>(null);
  const vsKey = column.id as keyof Vs;
  const value = row.original[vsKey];
  const isTimeColumn = vsKey === "time";
  const isNurseColumn = vsKey === "nurse";
  const { user } = useAuth();

  useEffect(() => {
    if (focused && !isNurseColumn) {
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
    const isTimeColumn = column.id === "time";
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
        readOnly
        value={isTimeColumn ? formatTime(value as string) : value}
        // onChange={(e) => {
        //   setVsByRow(row.index, vsKey, e.target.value);
        // }}
      />

      <VsKeyboardWrapper ref={keyboardRef} showKeyboard={showKeyboard}>
        <VsKeyboardHeader
          vs={row.original}
          currentValue={vsKey}
          isTimeColumn={isTimeColumn}
        />
        {isTimeColumn ? (
          <TimeKeyboard
            showKeyboard={showKeyboard}
            timeValue={row.original.time}
            onValueChange={(time) => {
              setVsByRow(row.index, vsKey, time);
            }}
            onNext={() => handleNextColumnFocus(row, column)}
          />
        ) : (
          <VsInputKeyboard
            showKeyboard={showKeyboard}
            onValueChange={(value) => {
              setVsByRow(row.index, vsKey, value);
            }}
            onNext={() => handleNextColumnFocus(row, column)}
          />
        )}
      </VsKeyboardWrapper>
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
    <Keyboard
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
