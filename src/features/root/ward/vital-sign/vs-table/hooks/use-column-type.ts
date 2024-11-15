import { Vs } from "@/shared/dto/socket-io";
import { columnSettings } from "../consts";

export const useColumnType = (columnId: keyof Vs) => {
  const { type } = columnSettings[columnId] ?? {};
  return {
    isTimeColumn: type === "time",
    isNurseColumn: type === "nurse",
    isTextColumn: type === "text",
    isNumberColumn: type === "number",
  };
};