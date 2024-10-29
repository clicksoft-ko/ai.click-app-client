import { Vs } from "@/shared/dto/socket-io";

export const vsMenuName: Partial<Record<keyof Vs, string>> = {
  time: "시간",
  hulap1: "혈압(이완)",
  hulap2: "혈압(수축)",
  maekbak: "맥박",
  cheon: "체온",
  hohup: "호흡",
  weight: "체중(kg)",
  height: "신장(cm)",
  bmi: "BMI(kg/m²)",
  intake: "Intake",
  urine: "Urine",
  stools: "Stools",
  fluids: "Total Fluids",
  blood: "Blood",
  aspiration: "Aspiration",
  drainage: "Drainage",
  vomitus: "Vomitus",
  glucose: "BST",
  spo2: "SPO2",
  etc4: "비고",
};
