import { Vs } from "@/shared/dto/socket-io";

export type ColumnType = "time" | "text" | "nurse" | "number";

export const columnSettings: Partial<
  Record<keyof Vs, { size: number; type: ColumnType }>
> = {
  time: { size: 80, type: "time" },
  nurse: { size: 90, type: "nurse" },
  hulap1: { size: 90, type: "number" },
  hulap2: { size: 90, type: "number" },
  maekbak: { size: 90, type: "number" },
  cheon: { size: 90, type: "number" },
  hohup: { size: 90, type: "number" },
  weight: { size: 90, type: "number" },
  height: { size: 90, type: "number" },
  bmi: { size: 90, type: "number" },
  intake: { size: 90, type: "number" },
  urine: { size: 90, type: "number" },
  stools: { size: 90, type: "number" },
  fluids: { size: 90, type: "number" },
  blood: { size: 90, type: "number" },
  aspiration: { size: 90, type: "number" },
  drainage: { size: 90, type: "number" },
  vomitus: { size: 90, type: "text" },
  glucose: { size: 90, type: "number" },
  spo2: { size: 90, type: "number" },
  etc4: { size: 200, type: "text" },
};
