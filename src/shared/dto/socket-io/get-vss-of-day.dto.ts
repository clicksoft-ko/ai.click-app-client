export interface GetVssOfDayDto {
  chartNo: string;
  ymd: string;
}

export type GetVssOfDayResultDto = Vs[];

export class Vs {
  auto: number = 0;
  time: string = '';
  nurse: string = '';
  hulap1: string = '';
  hulap2: string = '';
  maekbak: string = '';
  cheon: string = '';
  hohup: string = '';
  weight: string = '';
  height: string = '';
  bmi: string = '';
  intake: string = '';
  urine: string = '';
  stools: string = '';
  fluids: string = '';
  blood: string = '';
  aspiration: string = '';
  drainage: string = '';
  vomitus: string = '';
  username: string = '';
  glucose: string = '';
  spo2: string = '';
  etc1: string = '';
  etc2: string = '';
  etc3: string = '';
  etc4: string = '';
  etc5: string = '';
}