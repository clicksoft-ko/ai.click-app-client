export interface GetInsulinsDto {
  chartNo: string;
  startYmd: string;
  endYmd: string;

  // searchString: string;
  page: number;
  count: number;
}

export type GetInsulinsResultDto = Insulin[];

export class Insulin {
  id!: string;
  writeDateShortText!: string;
  managerName!: string;
  details!: InsulinDetail[];
}

export class InsulinDetail {
  id!: string;
  timeText!: string;
  code!: string;
  name!: string;
  volume?: string;
  part?: string;
  blood?: string;
  urine?: string;
  memo?: string;
}
