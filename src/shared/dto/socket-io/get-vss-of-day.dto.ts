export interface GetVssOfDayDto {
  chartNo: string;
  ymd: string;
}

export type GetVssOfDayResultDto = Vs[];

export interface Vs {
  auto: number;
  time?: string;
  nurse?: string;
  hulap1?: string;
  hulap2?: string;
  maekbak?: string;
  cheon?: string;
  hohup?: string;
  weight?: string;
  height?: string;
  bmi?: string;
  intake?: string;
  urine?: string;
  stools?: string;
  fluids?: string;
  blood?: string;
  aspiration?: string;
  drainage?: string;
  vomitus?: string;
  glucose?: string;
  spo2?: string;
  etc4?: string;
}