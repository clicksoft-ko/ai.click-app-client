import { TitleValueDetail } from "./title-value-detail";

export interface GetVitalSignsDto {
  chartNo: string;
  startYmd: string;
  endYmd: string;

  // searchString: string;
  page: number;
  count: number;
}

export type GetVitalSignsResultDto = VitalSign[];

export class VitalSign {
  id!: string;
  writeDateFullText!: string;
  managerName!: string;
  details!: TitleValueDetail[];
}