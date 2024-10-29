import { Vs } from "@/shared/dto/socket-io";

export const vsMenuName: Partial<Record<keyof Vs, string>> = {
  time: "시간",
  hulap1: "혈압(이완)",
  hulap2: "혈압(수축)",
  maekbak: "맥박",
  cheon: "체온",
  hohup: "호흡",
  weight: "체중",
  height: "신장",
  bmi: "BMI",
  intake: "섭취량",
  urine: "소변량",
  stools: "대변",
  fluids: "수액",
  blood: "출혈",
  aspiration: "흡인",
  drainage: "배액",
  vomitus: "구토",
  glucose: "혈당",
  spo2: "SPO2",
};
