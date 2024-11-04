import { Vs } from "@/shared/dto/socket-io";

export type ColumnType = "time" | "text" | "nurse" | "number";

type BaseColumnSetting = {
  size: number;
};

type NumberColumnSetting = BaseColumnSetting & {
  type: "number";
  max: number;
  min: number;
  digits: number;
};

type TimeColumnSetting = BaseColumnSetting & {
  type: "time";
};

type TextColumnSetting = BaseColumnSetting & {
  type: "text";
};

type NurseColumnSetting = BaseColumnSetting & {
  type: "nurse";
};

type ColumnSetting = NumberColumnSetting | TimeColumnSetting | TextColumnSetting | NurseColumnSetting;

export const columnSettings: Partial<Record<keyof Vs, ColumnSetting>> = {
  time: { size: 80, type: "time" },
  nurse: { size: 90, type: "nurse" },
  hulap1: { size: 90, type: "number", max: 999, min: 0, digits: 0 },
  hulap2: { size: 90, type: "number", max: 999, min: 0, digits: 0 },
  maekbak: { size: 90, type: "number", max: 999, min: 0, digits: 0 },
  cheon: { size: 90, type: "number", max: 99.9, min: 0, digits: 1 },
  hohup: { size: 90, type: "number", max: 999, min: 0, digits: 0 },
  weight: { size: 90, type: "number", max: 999.9, min: 0, digits: 1 },
  height: { size: 90, type: "number", max: 999.9, min: 0, digits: 1 },
  bmi: { size: 90, type: "number", max: 999.99, min: 0, digits: 2 },
  intake: { size: 90, type: "number", max: 99999.9, min: 0, digits: 1 },
  urine: { size: 90, type: "number", max: 99999.9, min: 0, digits: 1 },
  stools: { size: 90, type: "number", max: 99999.9, min: 0, digits: 1 },
  fluids: { size: 90, type: "number", max: 99999.9, min: 0, digits: 1 },
  blood: { size: 90, type: "number", max: 99999.9, min: 0, digits: 1 },
  aspiration: { size: 90, type: "number", max: 99999.9, min: 0, digits: 1 },
  drainage: { size: 90, type: "number", max: 99999.9, min: 0, digits: 1 },
  vomitus: { size: 90, type: "text" },
  glucose: { size: 90, type: "number", max: 500, min: 0, digits: 0 },
  spo2: { size: 90, type: "number", max: 999.9, min: 0, digits: 1 },
  etc4: { size: 200, type: "text" },
};
