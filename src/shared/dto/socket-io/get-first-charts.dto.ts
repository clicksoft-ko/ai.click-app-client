import { ContentInfo } from "./content-info";
import { Weib } from "./get-patients.dto";

export interface GetFirstChartsDto {
  chartNo: string;
  startYmd: string;
  endYmd: string;

  weib: Weib;
  page: number;
  count: number;
}

export type GetFirstChartsResultDto = FirstChart[];

export class FirstChart {
  id!: string;
  writeDateFullText!: string;
  headers?: ContentInfo[];
  details!: ContentInfo[];
}

