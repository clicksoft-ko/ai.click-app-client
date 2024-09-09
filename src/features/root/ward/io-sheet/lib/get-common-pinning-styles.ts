import { IOSheet } from "@/shared/dto/socket-io";
import { Column } from "@tanstack/react-table";
import { CSSProperties } from "react";

export const getCommonPinningStyles = (
  column: Column<IOSheet>,
  type: "head" | "body" | "sum",
): CSSProperties => {
  const isPinned = column.getIsPinned();
  // const isPinned =
  //   column.getIndex() <= 1 ? "left" : column.getIndex() >= 50 ? "right" : "";
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");
  const isIntake = column.id.startsWith("intake");
  const backColor = {
    head: "rgb(245, 255, 245)",
    body: isIntake ? "rgb(255,244,244)" : "white",
    sum: "rgb(225, 255, 235)",
  };
  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.95 : 1,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
    backgroundColor: backColor[type],
  };
};
